package com.ca.control.service;

import com.ca.control.dao.*;
import com.ca.control.dto.*;
import com.ca.control.enums.*;
import com.ca.control.model.*;
import com.ca.control.utils.CalculoDeHoras;
import com.ca.control.utils.FormatoFecha;
import com.ca.control.utils.JwtUtils;
import com.ca.control.utils.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.aspectj.runtime.internal.Conversions.intValue;

@Service
@Transactional
public class RegistroHoraService {

	public static final String HORA_DESDE = " 00:00:00";
	public static final String HORA_HASTA = " 23:59:59";

	@Autowired
	ProyectoPersonaDao proyectoPersonaDao;

	@Autowired
	RegistroHoraDao registroHoraDao;


	@Autowired
	EmailService emailService;

	@Autowired
	FeriadoDao feriadoDao;

	@Autowired
	UsuarioService usuarioService;


	@Autowired
	LugarTrabajoDao lugarTrabajoDao;

	@Autowired
	TipoHoraDao tipoHoraDao;

	@Autowired
	ProyectoDao proyectoDao;

	@Autowired
	ClienteDao clienteDao;

	@Autowired
	TipoEstadoDao tipoEstadoDao;
	@Autowired
	FaseDao faseDao;

	@Autowired
	UsuarioDisponibilidadDao usuarioDisponibilidadDao;

	@Autowired
	UsuarioDisponibilidadService usuarioDisponibilidadService;

	FormatoFecha formatoFecha = new FormatoFecha();

	public ResponseEntity<JsonDto> hoursWorked(JsonHorasTrabajadasRequestDto json) {
		return setHoursWorked(json);
	}

	public ResponseEntity<JsonDto> stateOfTheDay(JsonUserDayRequestDto json) {
		ResponseEntity<JsonDto> registro = new ResponseEntity<JsonDto>(HttpStatus.ACCEPTED);
		registro = setSatateOfTheDay(json);
		return registro;

	}

	public ResponseEntity<JsonDto> unfinishedRegister(JsonDto json) {
		ResponseEntity<JsonDto> registro = new ResponseEntity<JsonDto>(HttpStatus.ACCEPTED);

		return registro;

	}

	public ResponseEntity<JsonDto> iniciarDia(JsonInicioPausaReinicioRequestDto jsonInicio) {
		ResponseEntity<JsonDto> registroInicio = new ResponseEntity<JsonDto>(HttpStatus.ACCEPTED);

		registroInicio = this.setStartDay(jsonInicio);

		return registroInicio;

	}

	public ResponseEntity<JsonDto> finalizeRegistroHora(JsonFinalizarRequestDto jsonFinalizar) throws Exception {

		try {
			ResponseEntity<JsonDto> finalizarRegistroHora = new ResponseEntity<JsonDto>(HttpStatus.ACCEPTED);


			finalizarRegistroHora = setFinalizeRegistro(jsonFinalizar);

			return finalizarRegistroHora;

		} catch (Exception e) {
			throw e;
		}

	}

	public ResponseEntity<JsonDto> getDayIncomplete(JsonFinalizarRequestDto jsonFinalizar) {

		ResponseEntity<JsonDto> finalizarDia = new ResponseEntity<JsonDto>(HttpStatus.ACCEPTED);

		finalizarDia = setChangeTask(jsonFinalizar);

		return finalizarDia;

	}

	public ResponseEntity<JsonListDto> userRegistrosHoraListByDay(JsonUserDayRequestDto json) {
		ResponseEntity<JsonListDto> listaRegistros = new ResponseEntity<JsonListDto>(HttpStatus.ACCEPTED);

		listaRegistros = getSearchRegistroHora(json);

		return listaRegistros;

	}

	public ResponseEntity<JsonListDto> restartPause(JsonInicioPausaReinicioRequestDto json) {
		ResponseEntity<JsonListDto> listaRegistros = new ResponseEntity<JsonListDto>(HttpStatus.ACCEPTED);

		listaRegistros = setJsonListDto(json);

		return listaRegistros;

	}

	// ------------------------------- FUNCIONES
	// -----------------------------------------------
	private ResponseEntity<JsonListDto> getSearchRegistroHora(JsonUserDayRequestDto json) {
		Validate validate = new Validate();
		List<Object> registros = registersSearch(json, validate);
		JsonListDto jsonListDto = newJsonList(json, validate);
		if (validate.getSuccess()) {
			if (registros.isEmpty()) {
				validate.setError(CodigosEstadoEnum.OK_SIN_REGISTROS, true);
			} else {
				validate.setError(CodigosEstadoEnum.OK, true);
			}

		}

		return jsonListDto.jsonListResponde(registros, validate);

	}

	public RegistroHora finalizarJornada(FinalizarFrontDto json) throws Exception {
		try {
			Validate validate = new Validate();

			Usuario usuario = usuarioService.findByUsername(json.getUser());

			RegistroHora registroHoraAFinalizar = registroHoraDao.findAllByUsuarioAndFinNullOrderByIdDesc(usuario);
			if (registroHoraAFinalizar == null) { // Si no hay registros sin finalizar
				throw new IllegalArgumentException("ERROR: No se encontró registro iniciado");

			} else if (!CalculoDeHoras.calcularDiaValidos(registroHoraAFinalizar.getInicio(),
					FormatoFecha.stringADate(json.getHour()), validate)) {
				throw new IllegalArgumentException("ERROR: Inicio mayor a fin");
			} else {
				registroHoraAFinalizar.setFin(FormatoFecha.stringADate(json.getHour()));
				registroHoraAFinalizar.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.FINALIZADO.getNombre()));
				return registroHoraDao.save(registroHoraAFinalizar);
			}
		} catch (IllegalArgumentException e) {
			throw e;
		}
	}

	private ResponseEntity<JsonDto> setFinalizeRegistro(JsonFinalizarRequestDto jsonFinalizar) {
		Validate validate = new Validate();
		JsonDto json = new JsonDto(jsonFinalizar.getHeader(), jsonFinalizar.getInfo());

		return json.jsonResponde(
				newRegistroHoraDto(registroHoraDao.save(registroHoraAFinalizar(jsonFinalizar, validate)), validate),
				validate);

	}

	private ResponseEntity<JsonDto> setChangeTask(JsonFinalizarRequestDto jsonFinalizar) {
		Validate validate = new Validate();
		JsonDto json = new JsonDto(jsonFinalizar.getHeader(), jsonFinalizar.getInfo());
		return json.jsonResponde(
				newRegistroHoraDto(registroHoraDao.save(setToChangeRegistroHora(jsonFinalizar, validate)), validate),
				validate);

	}

	private ResponseEntity<JsonDto> setHoursWorked(JsonHorasTrabajadasRequestDto jsonHorasTrabajadas) {
		FormatoFecha fechas = new FormatoFecha();
		JsonDto JsonFront = new JsonDto(jsonHorasTrabajadas.getHeader(), jsonHorasTrabajadas.getInfo());
		Validate validate = new Validate();
		return JsonFront.jsonResponde(
				calculationOfHoursAndMinutesWorked(
						searchRegistroHoraBetweenDates(jsonHorasTrabajadas.getData().getUser(),
								fechas.stringADate(jsonHorasTrabajadas.getData().getBegin()),
								fechas.stringADate(jsonHorasTrabajadas.getData().getEnd()), validate),
						validate),
				validate);

	}

	private HorasTrabajadasDto calculationOfHoursAndMinutesWorked(List<RegistroHoraDto> registros, Validate validate) {

		HorasTrabajadasDto horasTrabajadas = new HorasTrabajadasDto(0L, 0L);

		Long diff = 0L;

		for (RegistroHoraDto registroHora : registros) {
			TipoHora tipoHora = tipoHoraDao.findAllByNombre(registroHora.getTipoHora());
			if (tipoHora.getTipo().name() != TipoHoraEnum.PAUSA.name()) {

				diff += CalculoDeHoras.calcularDiferenciaEntreHoras(registroHora.getBegin(), registroHora.getEnd(),
						validate);
				if (!validate.getSuccess()) {
					return horasTrabajadas;
				}
			}
		}
		horasTrabajadas.setHours(Long.valueOf(diff / 3600000));
		horasTrabajadas.setMinutes(Long.valueOf((diff % 3600000) / 60000));
		return horasTrabajadas;

	}

	private ResponseEntity<JsonDto> setSatateOfTheDay(JsonUserDayRequestDto jsonEstadoDia) {
		try {
			// LinkedHashMap jsonData = (LinkedHashMap) json.getData();
			JsonDto json = new JsonDto(jsonEstadoDia.getHeader(), jsonEstadoDia.getInfo());
			Validate validate = new Validate();
			Timestamp horaDesde = formatoFecha.stringADate((String) jsonEstadoDia.getData().getDay() + HORA_DESDE);
			Timestamp horaHasta = formatoFecha.stringADate((String) jsonEstadoDia.getData().getDay() + HORA_HASTA);
			Usuario u = usuarioService.findByUsername(jsonEstadoDia.getData().getUser());
			RegistroHora registro = registroHoraDao.ultimoRegistroDia(u.getId(), horaDesde, horaHasta);
			EstadoDiaDto estadoDia = new EstadoDiaDto();

			if (registro != null) {

				if (registro.getFin() != null) {

					estadoDia.setEstado(
							registro.getTipoHora().getTipo() == TipoHoraEnum.FINALIZADO ? EstadosEnum.FINALIZADO
									: EstadosEnum.CAMBIO);
					estadoDia.setHorasTrabajadas(Integer
							.parseInt(CalculoDeHoras.calcularHoras(registro.getInicio(), registro.getFin(), validate)));

					estadoDia.setHoraFin(registro.getFin());


				} else {
					estadoDia.setEstado(
							registro.getTipoHora().getTipo() == TipoHoraEnum.PRODUCTIVA ? EstadosEnum.INICIADO
									: EstadosEnum.PAUSADO);

				}
				//	estadoDia.setHorasTrabajadas(Integer
				//			.parseInt(CalculoDeHoras.calcularHoras(registro.getInicio(), new Timestamp(System.currentTimeMillis()), validate)));
				estadoDia.setHoraInicio(registro.getInicio());
				//	estadoDia.setHoraFin(registro.getFin());
				estadoDia.setLugarTrabajo(
						registro.getLugarTrabajo() == null ? null : registro.getLugarTrabajo().getNombre());
				validate.setError(CodigosEstadoEnum.OK, true);
				return json.jsonResponde(estadoDia, validate);
			} else {
				EstadoDiaDto vacio = new EstadoDiaDto();
				vacio.setEstado(EstadosEnum.SIN_INICIAR);
				validate.setError(CodigosEstadoEnum.OK, true);
				return json.jsonResponde(vacio, validate);
			}
		} catch (Exception e) {
			EstadoDiaDto estadoDia = new EstadoDiaDto();
			Validate validate = new Validate();
			validate.setError(CodigosEstadoEnum.ERROR_INTERNO, false);
			JsonDto json = new JsonDto(jsonEstadoDia.getHeader(), jsonEstadoDia.getInfo());
			System.out.println("Error en RegistroHoraService > setSatateOfTheDay " + e);
			return json.jsonResponde(estadoDia, validate);
		}

	}

	private EstadosEnum takeEstadoEnum(RegistroHoraDto registroHoraDto, EstadoDiaDto estadoDia) {
		TipoHora tipohora = tipoHoraDao.findAllByNombre(registroHoraDto.getTipoHora());
		if (registroHoraDto.getEnd() == null) {
			switch (tipohora.getTipo().name()) {
				case "PAUSA":
					return EstadosEnum.PAUSADO;

				default:
					return EstadosEnum.INICIADO;
			}
		} else {
			return EstadosEnum.FINALIZADO;
		}
	}

	private EstadoDiaDto calculationOfHoursWorked(List<RegistroHoraDto> registros, Validate validate) {

		FormatoFecha fechas = new FormatoFecha();
		EstadoDiaDto estadoDia = new EstadoDiaDto();
		estadoDia.setHorasTrabajadas(0);
		for (int i = 0; i < registros.size(); i++) {

			TipoHora tipoHora = tipoHoraDao.findAllByNombre(registros.get(i).getTipoHora());

			if (tipoHora.getTipo().name() != TipoHoraEnum.PAUSA.name()) {

				if (registros.get(i).getEnd() != null) {
					estadoDia.setHorasTrabajadas(
							estadoDia.getHorasTrabajadas() + Integer.valueOf(registros.get(i).getHour()));
				} else {
					estadoDia.setHorasTrabajadas(estadoDia.getHorasTrabajadas()
							+ Integer.valueOf(CalculoDeHoras.calcularHoras(registros.get(i).getBegin(),
							fechas.stringADate(
									LocalDateTime.now().format(fechas.getAnioMesDiaHoraMinutosSegundosGuion())),
							validate)));
				}
			}

		}

		return estadoDia;
	}

	private ResponseEntity<JsonDto> setStartDay(JsonInicioPausaReinicioRequestDto jsonInicio) {

		ResponseEntity<JsonDto> registroInicio;
		Validate validate = new Validate();
		JsonDto json = new JsonDto(jsonInicio.getHeader(), jsonInicio.getInfo());
		boolean existe = usuarioExists(jsonInicio.getData().getUser(), validate);

		if (existe && !registroHoraExistsOpen(jsonInicio.getData().getUser(), validate)) {

			registroInicio = json.jsonResponde(
					newRegistroHoraDto(
							registroHoraDao
									.save(newRegistroHora(jsonInicio, TipoHoraEnum.PRODUCTIVA.getNombre(), validate)),
							validate),
					validate);

		} else if (!existe) {
			validate.setError(CodigosEstadoEnum.ERROR_USUARIO_NO_ENCONTRADO, false);
			registroInicio = json.jsonResponde(null, validate);

		} else {
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_HORA_YA_INICIADO, false);
			registroInicio = json.jsonResponde(null, validate);
		}

		return registroInicio;

	}

	private ResponseEntity<JsonDto> newJsonDtoSearchRecordFinished(JsonDto json) {

		Validate validate = new Validate();
		ResponseEntity<JsonDto> jsonDto = new JsonDto(json)
				.jsonResponde(newRegistroHoraDto(searchForUnfinishedRegistroHora(json, validate), validate), validate);
		if (validate.getSuccess()) {
			return jsonDto;
		} else {
			validate.setError(CodigosEstadoEnum.REGISTRO_NO_ENCONTRADO, false);
			return jsonDto;
		}

	}

	private ResponseEntity<JsonListDto> setJsonListDto(JsonInicioPausaReinicioRequestDto jsonFront) {

		Validate validate = new Validate();
		JsonDto json = new JsonDto(jsonFront.getHeader(), jsonFront.getInfo());
		ResponseEntity jsonListDto = new JsonListDto(json).jsonListResponde(
				(List) registroHoraDataListFormat(registrosHoraRecord(jsonFront, validate), validate), validate);
		if (validate.getSuccess()) {
			return jsonListDto;
		} else {
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_GUARDADO, false);
			return jsonListDto;
		}
	}

	private RegistroHora searchForUnfinishedRegistroHora(JsonDto json, Validate validate) {
		try {
			LinkedHashMap jsonData = (LinkedHashMap) json.getData();
			RegistroHora registroHora = registroHoraDao.findAllByUsuarioAndFinNullOrderByIdDesc(
					usuarioService.findByUsername((String) jsonData.get(DataJsonKeyEnum.USUARIO.getRef())));
			validate.setError(CodigosEstadoEnum.OK, true);

			return registroHora;
		} catch (Exception e) {
			validate.setError(CodigosEstadoEnum.REGISTRO_NO_ENCONTRADO, false);
			System.out.println("Error en RegistroHoraService > searchForUnfinishedRegistroHora " + e);
			return new RegistroHora();
		}
	}

	private RegistroHora newRegistroHora(JsonInicioPausaReinicioRequestDto jsonInicio, String tipoHora,
										 Validate validate) {

		if (jsonInicio.getData().getHour() != "") {

			RegistroHora registroHora = new RegistroHora(
					FormatoFecha.stringADate(jsonInicio.getData().getHour()),
					jsonInicio.getData().getIdLugarTrabajo() == null ? null
							: lugarTrabajoDao.findAllById(jsonInicio.getData().getIdLugarTrabajo()),
					tipoHoraDao.findAllByNombre(tipoHora),
					usuarioService.findByUsername(jsonInicio.getData().getUser()),
					usuarioService.findByUsername(jsonInicio.getData().getUser()).getLider());
			registroHora.setEstadoRegistroHora(EstadoRegistroHora.INICIADO);

			validate.setError(CodigosEstadoEnum.OK, true);
			return registroHora;

		} else {
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_CREADO, false);
			return new RegistroHora();
		}

	}

	private RegistroHora setToChangeRegistroHora(JsonFinalizarRequestDto json, Validate validate) {

		RegistroHora registroHoraFinalizado = registroHoraDao
				.findAllByUsuarioAndFinNullOrderByIdDesc(
						usuarioService.findByUsername(json.getData().getUser()));
		if (registroHoraFinalizado == null) {
			validate.setError(CodigosEstadoEnum.NO_SE_ENCONTRO_REGISTRO_INICIADO, false);
			return new RegistroHora();
		} else if (!CalculoDeHoras.calcularDiaValidos(registroHoraFinalizado.getInicio(),
				formatoFecha.stringADate(json.getData().getHour()), validate)) {
			validate.setError(CodigosEstadoEnum.ERROR_INICIO_MAYOR_A_FIN, false);
			return new RegistroHora();
		} else {
			registroHoraFinalizado.setFin(formatoFecha.stringADate(json.getData().getHour()));
			registroHoraFinalizado.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.CAMBIO.getNombre()));
			validate.setError(CodigosEstadoEnum.OK, true);

			return registroHoraFinalizado;
		}

	}

	private RegistroHora registroHoraAFinalizar(JsonFinalizarRequestDto json, Validate validate) {

		RegistroHora registroSinFinalizar = registroHoraDao.findAllByUsuarioAndFinNullOrderByIdDesc(
				usuarioService.findByUsername(json.getData().getUser()));
		if (registroSinFinalizar == null) { // Si no hay registros sin finalizar
			validate.setError(CodigosEstadoEnum.NO_SE_ENCONTRO_REGISTRO_INICIADO, false);
			return new RegistroHora();
		} else if (!CalculoDeHoras.calcularDiaValidos(registroSinFinalizar.getInicio(),
				FormatoFecha.stringADate(json.getData().getHour()), validate)) {
			validate.setError(CodigosEstadoEnum.ERROR_INICIO_MAYOR_A_FIN, false);
			return new RegistroHora();
		} else {
			registroSinFinalizar.setFin(FormatoFecha.stringADate(json.getData().getHour()));
			registroSinFinalizar.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.FINALIZADO.getNombre()));
			validate.setError(CodigosEstadoEnum.OK, true);

			return registroSinFinalizar;
		}

	}

	private RegistroHora setToFinishRegistroHoraPause(JsonInicioPausaReinicioRequestDto jsonFront, Validate validate) {

		RegistroHora registroHoraFinalizado = registroHoraDao.findAllByUsuarioAndFinNullOrderByIdDesc(
				usuarioService.findByUsername(jsonFront.getData().getUser()));
		if (registroHoraFinalizado == null) {
			validate.setError(CodigosEstadoEnum.NO_SE_ENCONTRO_REGISTRO_INICIADO, false);
			return new RegistroHora();
		} else if (!CalculoDeHoras.calcularDiaValidos(registroHoraFinalizado.getInicio(),
				formatoFecha.stringADate(jsonFront.getData().getHour()), validate)) {
			validate.setError(CodigosEstadoEnum.ERROR_INICIO_MAYOR_A_FIN, false);
			return new RegistroHora();
		} else {
			registroHoraFinalizado.setFin(formatoFecha.stringADate(jsonFront.getData().getHour()));
			validate.setError(CodigosEstadoEnum.OK, true);

			return registroHoraFinalizado;
		}

	}

	private RegistroHoraDto newRegistroHoraDto(RegistroHora registroHora, Validate validate) {
		try {
			RegistroHoraDto nuevoRegistroHoraDto = new RegistroHoraDto(registroHora.getId(),
					registroHora.getUsuario().getUsername(), registroHora.getInicio(), registroHora.getFin(),
					registroHora.getLugarTrabajo() != null ? registroHora.getLugarTrabajo().getNombre() : null,
					registroHora.getTipoHora().getNombre(), registroHora.getEstadoRegistro(),
					registroHora.getFase() != null ? registroHora.getFase().getId().toString() : null,
					registroHora.getDescripcion(), registroHora.getUsuario().getLider().getUsername()

			);
			nuevoRegistroHoraDto
					.setProyectoText(registroHora.getProyectoText() != null ? registroHora.getProyectoText() : null);

			nuevoRegistroHoraDto.calcularHoraRango(validate);

			nuevoRegistroHoraDto.setEstadoGeneral(this.completoRegistro(registroHora));

			validate.setError(CodigosEstadoEnum.OK, true);

			return nuevoRegistroHoraDto;
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > newRegistroHoraDto " + e);
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_CREADO, false);
			validate.setMessage(e.getMessage());
			return new RegistroHoraDto();
		}

	}

	private JsonListDto newJsonList(JsonUserDayRequestDto jsonFront, Validate validate) {
		jsonFront.getHeader().setDate(formatoFecha.diaMesAnioMinutosSegundos());
		try {
			validate.setSuccess(true);
			;
			return new JsonListDto(jsonFront.getHeader(), jsonFront.getInfo());
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > newJsonList " + e);
			validate.setError(CodigosEstadoEnum.ERROR_ENTIDAD_NO_INICALIZADA, false);
			return new JsonListDto();
		}

	}

	private List searchRegistroHoraBetweenDates(String user, Timestamp horaDesde, Timestamp horaHasta,
												Validate validate) {
		try {
			if (CalculoDeHoras.calcularDiaValidos(horaDesde, horaHasta, validate)) {
				return (List) registroHoraDataListFormat(
						registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(
								usuarioService.findByUsername(user), horaDesde, horaHasta),
						validate);
			}
			return empty();
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > searchRegistroHoraBetweenDates " + e);
			if (validate.getCode() != CodigosEstadoEnum.REGISTRO_NO_ENCONTRADO || !validate.getSuccess()) {
				validate.setError(CodigosEstadoEnum.REGISTRO_NO_ENCONTRADO, false);
			}

			return empty();
		}

	}

	private List<Object> registersSearch(String day, String user, Validate validate) {
		try {

			Timestamp horaDesde = formatoFecha.stringADate(day + HORA_DESDE);
			Timestamp horaHasta = formatoFecha.stringADate(day + HORA_HASTA);
			return searchRegistroHoraBetweenDates(user, horaDesde, horaHasta, validate);

		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registersSearch " + e);
			validate.setError(CodigosEstadoEnum.ERROR_SERVIDOR_NO_RESPONDE, false);

			return empty();
		}
	}

	private List<Object> registersSearch(JsonUserDayRequestDto jsonFront, Validate validate) {
		try {

			Timestamp horaDesde = formatoFecha.stringADate(jsonFront.getData().getDay() + HORA_DESDE);
			Timestamp horaHasta = formatoFecha.stringADate(jsonFront.getData().getDay() + HORA_HASTA);
			return searchRegistroHoraBetweenDates(jsonFront.getData().getUser(), horaDesde, horaHasta, validate);

		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registersSearch " + e);
			validate.setError(CodigosEstadoEnum.ERROR_SERVIDOR_NO_RESPONDE, false);

			return empty();
		}
	}

	private List<Object> empty() {
		List lista = new ArrayList<Object>();
		return lista;
	}

	private List<RegistroHora> registroHoraEmpty() {
		List<RegistroHora> lista = new ArrayList<>();
		return lista;
	}

	private List<RegistroHoraDto> registroHoraDtoempty() {
		List<RegistroHoraDto> lista = new ArrayList<>();
		return lista;
	}

	private List<RegistroHora> registrosHoraRecord(JsonInicioPausaReinicioRequestDto json, Validate validate) {
		try {

			List<RegistroHora> registros = new ArrayList<>();
			RegistroHora registroHoraFinalizado = this.setToFinishRegistroHoraPause(json, validate);
			registros.add(registroHoraFinalizado);

			registros.add(newRegistroHora(json,
					registroHoraFinalizado.getTipoHora().getTipo() == TipoHoraEnum.PRODUCTIVA
							? TipoHoraEnum.PAUSA.getRef()
							: TipoHoraEnum.PRODUCTIVA.getRef(),
					validate));
			return (List<RegistroHora>) registroHoraDao.saveAll(registros);
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registrosHoraRecord " + e);
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_GUARDADO, false);
			return registroHoraEmpty();
		}

	}

	private List<RegistroHoraDto> registroHoraDataListFormat(List<RegistroHora> registros, Validate validate) {
		try {
			List<RegistroHoraDto> registroHoraDataList = new ArrayList<>();
			registros.forEach((RegistroHora registroHora) -> {

				try {
					registroHoraDataList.add(this.newRegistroHoraDto(registroHora, validate));
				} catch (Exception ex) {
					Logger.getLogger(RegistroHoraService.class.getName()).log(Level.SEVERE, null, ex);
				}

			});

			return registroHoraDataList;
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registroHoraDataListFormat " + e);
			validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_GUARDADO, false);

			return registroHoraDtoempty();
		}
	}

	private boolean registroHoraExistsOpen(String user, Validate validate) {
		try {
			return registroHoraDao.existsByUsuarioAndFinNull(usuarioService.findByUsername(user));
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registroHoraExistsOpen " + e);
			validate.setError(CodigosEstadoEnum.ERROR_DE_CONSULTA, false);
			return false;

		}

	}

	private boolean usuarioExists(String user, Validate validate) {

		Boolean usuario = usuarioService.existsByUsernameIgnoreCase(user);
		if (usuario) {
			return usuario;
		} else {
			validate.setError(CodigosEstadoEnum.ERROR_USUARIO_NO_ENCONTRADO, false);
			return false;

		}

	}

	public boolean createRegistroHora(JsonCreateRequestDto jsonFront, String token) {
		try {
			Date newDate = new Date();
			Usuario u = usuarioService.getUsuarioByToken(jsonFront.getHeader().getToken());
			RegistroHora rh = new RegistroHora();
			Validate validate = new Validate();
			if (this.validacionHoraRegistroscreateR(jsonFront, validate)) {
				rh.setInicio(FormatoFecha.stringADate(jsonFront.getData().getBegin()));
				rh.setFin(FormatoFecha.stringADate(jsonFront.getData().getEnd()));
				rh.setLugarTrabajo(jsonFront
						.getData()
						.getIdLugarTrabajo() != null
						? lugarTrabajoDao.findAllById(jsonFront.getData().getIdLugarTrabajo())
						: null);
				rh.setTipoHora(tipoHoraDao.findAllById(jsonFront.getData().getIdTipoHora()));
				rh.setUsuario(u);
				rh.setEstadoRegistroHora(EstadoRegistroHora.INICIADO);
				rh.setFechaUltimaEdicion(newDate);
				rh.setUsuarioUltimaEdicion(token);
				registroHoraDao.save(rh);
				JsonDto json = new JsonDto(jsonFront.getHeader(), jsonFront.getInfo());

				return true;
			} else {
				return false;
			}
		} catch (Exception ex) {
			System.out.println("Error en RegistroHoraService > createRegistroHora " + ex);
			return false;
		}
	}

	public boolean deleteRegistroHora(JsonDeleteRequestDto jsonFront) {

		if (registroHoraDao.existsById(jsonFront.getData().getRegistroId())) {
			registroHoraDao.deleteById(jsonFront.getData().getRegistroId());
			return true;
		} else {
			return false;
		}
	}


	public RegistroHora updateRegistroHora(EditarRegistroHoraRequest request) {
		try {
			RegistroHora rh = registroHoraDao.findAllById(request.getRegistroId());
			Fase fase = faseDao.findAllById(request.getIdFase());

			if (rh.getTipoHora().getTipo() == TipoHoraEnum.PAUSA) {
				rh.setDescripcion(request.getDescripcion());
				rh.setJustificacion(request.getJustificacion());
				rh.setCaracteristica("Editado");
			} else {
				rh.setDescripcion(request.getDescripcion());
				rh.setEstadoRegistro(request.getTipoEstadoEnum());
				//rh.setCliente(clienteDao.findById(request.getIdCliente()).orElseThrow( ()-> new IllegalArgumentException("No existe cliente con ese Id")));
				rh.setFase(faseDao.findById(request.getIdFase()).orElseThrow(() -> new IllegalArgumentException("No existe fase con ese Id")));
				rh.setLugarTrabajo(lugarTrabajoDao.findById(request.getIdLugarTrabajo()).orElseThrow(() -> new IllegalArgumentException("No existe lugar de trabajo con ese Id")));

				if (fase.getProyecto().getTipoproyecto() == TipoProyectoEnum.LICENCIA) {//Si el proyecto enviado es una LICENCIA
					rh.setTipoHora(tipoHoraDao.findAllById(3L));//Le seteo el TipoHora de LICENCIA (id 3L)
				} else if (fase.getProyecto().getTipoproyecto() == TipoProyectoEnum.PRODUCTIVA) {//Si el proyecto enviado es PRODUCTIVO
					if (rh.getTipoHora().getTipo() == TipoHoraEnum.LICENCIA) {//Si el tipo de hora previo a editar era una Licencia, lo cambio al que me mandan
						rh.setTipoHora(tipoHoraDao.findAllById(request.getIdTipoHora()));
					} else {//Si no era una licencia, le dejo el que tenía
						rh.setTipoHora(rh.getTipoHora());
					}
				}

				//rh.setTipoHora(fase.getProyecto().getTipoproyecto() == TipoProyectoEnum.LICENCIA ? tipoHoraDao.findAllById(3L) : tipoHoraDao.findAllById(3L));

				//rh.setTipoHora(tipoHoraDao.findById(request.getIdTipoHora()).orElseThrow( ()-> new IllegalArgumentException("No existe tipo hora con ese Id")));
				rh.setJustificacionCalendario(request.getJustificacion());
				rh.setProyectoText(request.getProyectoText());
				rh.setCaracteristica("Editado");
			}


			//Fraccionamiento
			Timestamp parsedRequestFin = Timestamp.valueOf(request.getFin());//Transformacion del fin de la request a Timestamp
			if (!parsedRequestFin.equals(rh.getFin())) {

				fraccionamientoDeRegistro(rh, parsedRequestFin);
			}

			return registroHoraDao.save(rh);
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > update " + e);
			throw e;
		}
	}


	/*
	 * Método responsable del fraccionamiento
	 *
	 * Se ejecuta en caso de que el fin enviado por el front sea distinto al que ya existía
	 *
	 *
	 * */
	public void fraccionamientoDeRegistro(RegistroHora rh, Timestamp requestFin) {
		try {
			Date fecha = new Date(requestFin.getTime());//Obtengo en formato Date la fecha de la peticion

			/* Le reemplazo las horas por 00:00 y 23:59 para buscar los registros del día */

			//Date desde = FormatoFecha.removeTime(fecha);
			Date hasta = FormatoFecha.addTime(fecha);

			//Busco todos los registros del día a partir del fin del que estoy editando
			List<RegistroHora> registrosDelDia = registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(rh.getUsuario(), rh.getFin(), hasta);

			//Condición para evitar modificación del horario de fin
			if (requestFin.after(rh.getFin())) {//Si el fin que recibo está por delante del fin del registro, devuelvo un error
				throw new IllegalArgumentException();
			}
			//Condición para evitar modificación del horario de inicio
			if (requestFin.before(rh.getInicio())) {//Si el fin que recibo está por detras del inicio del registro, devuelvo un error
				throw new IllegalArgumentException();
			} else {
				//Guardo el fin previo del registro
				Timestamp finPrevio = rh.getFin();

				//Seteo del fin de la petición
				rh.setFin(requestFin);

				//Me guardo el fin de la petición en un objeto de tipo Timestamp, con motivo de usarlo y mutarlo
				Timestamp finNuevo = requestFin;

				//Si no existen registros posteriores, creo el remanente
				if (registrosDelDia.isEmpty()) {
					//Al método le paso el fin nuevo y el fin previo, junto con el usuario para asignarle el remanente
					crearRegistroRemanente(rh.getFin(), finPrevio, rh.getUsuario());
				} else {//Si existen registros posteriores, actualizo sus inicios
					for (RegistroHora reg : registrosDelDia) {
						//Si el registro iterado es una pausa, se procesa de manera específica
						if (reg.getTipoHora().getTipo().equals(TipoHoraEnum.PAUSA)) {

							if (finNuevo.before(reg.getInicio())) {//Si el fin del registro anterior es distinto al iterado actual

								crearRegistroRemanente(finNuevo, reg.getInicio(), reg.getUsuario());
								finNuevo = reg.getFin();
							} else {
								reg.setInicio(finNuevo);
								finNuevo = reg.getFin();

							}

						}//Si no es una pausa, se actualiza el inicio del registro con el nuevo FIN del registro anterior
						else {
							reg.setInicio(finNuevo);
							finNuevo = reg.getFin();//Actualizo el finNuevo con el fin del registro iterado, para que en la siguiente iteración el inicio se setee con el registro correspondiente anterior
						}
					}
				}
			}

		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService < fraccionamientoDeRegistro: " + e);
			throw e;
		}
	}

	/*
	 * Método responsable de la creación de un remanente a partir de un registro
	 *
	 * Recibe 2 timestamps
	 *   inicio = fin nuevo del registro editado
	 *   fin = fin previo del registro editado
	 * */
	public void crearRegistroRemanente(Timestamp inicio, Timestamp finPrevio, Usuario usuario) {
		try {
			RegistroHora remanente = new RegistroHora();

			remanente.setInicio(inicio);
			remanente.setCaracteristica(TipoEstadoEnum.NUEVO.getNombre());
			remanente.setEstadoRegistro(TipoEstadoEnum.PARA_EDITAR.getNombre());
			remanente.setFin(finPrevio);
			remanente.setUsuario(usuario);
			remanente.setLider(usuario.getLider());
			remanente.setTipoHora(tipoHoraDao.findAllById(6L));
			remanente.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
			registroHoraDao.save(remanente);

		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService < crearRegistroRemanente: " + e);
			throw e;
		}
	}

	public boolean updateRegistroHora(JsonUpdateRequestDto jsonFront) {
		RegistroHora registroHora = findById(jsonFront.getData().getRegistroId());
		if (registroHora == null)
			return false;

		try {
			if (this.validacionHoraRegistrosupdateR(jsonFront, jsonFront.getData().getRegistroId())) {
				registroHora.setInicio(FormatoFecha.stringADate(jsonFront.getData().getBegin()));
				registroHora.setFin(FormatoFecha.stringADate(jsonFront.getData().getEnd()));
				registroHora.setLugarTrabajo(jsonFront.getData().getIdLugarTrabajo() != null
						? lugarTrabajoDao.findAllById(jsonFront.getData().getIdLugarTrabajo())
						: null);
				registroHora.setFase(
						jsonFront.getData().getIdFase() != null ? faseDao.findAllById(jsonFront.getData().getIdFase())
								: null);
				registroHora.setProyectoText(jsonFront.getData().getProyectoText());
				registroHora.setTipoHora(tipoHoraDao.findAllById(jsonFront.getData().getIdTipoHora()));
				if (isFinalizado(registroHora))
					registroHora.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);


				registroHoraDao.save(registroHora);
				return true;
			} else {
				return false;
			}
		} catch (Exception ex) {
			System.out.println("Error en RegistroHoraService > updateRegistroHora " + ex);
			return false;
		}
	}

	public RegistroHora findById(Long id) {
		return registroHoraDao.findById(id).orElse(null);
	}

	public boolean validacionHoraRegistroscreateR(JsonCreateRequestDto jsonFront, Validate validate) {
		boolean resultado = false;
		try {
			List<RegistroHoraDto> registros = (List<RegistroHoraDto>) (Object) this
					.registersSearch(jsonFront.getData().getDay(), jsonFront.getData().getUser(), validate);
			Timestamp actualInicio = (formatoFecha.stringADate(jsonFront.getData().getBegin()));
			Timestamp actualFinal = (formatoFecha.stringADate(jsonFront.getData().getEnd()));

			if (registros.isEmpty()) {
				resultado = true;
			}

			for (RegistroHoraDto dto : registros) { // recorro los registros de ese usuario para ese dia y valido que no
				// se solapee con lo enviado en jsondata
				if ((actualInicio.after(dto.getBegin()) && actualFinal.before(dto.getEnd())
						&& actualInicio.before(dto.getEnd()) && actualFinal.after(dto.getBegin())
						|| (actualInicio.before(registros.get(0).getBegin())
						&& actualFinal.before(registros.get(0).getBegin()))
						|| (actualInicio.after(registros.get(registros.size() - 1).getEnd())
						&& actualFinal.after(registros.get(registros.size() - 1).getEnd())))) {
					resultado = true;
				}
			}
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > validacionHoraRegistroscreateR " + e);
			validate.setError(CodigosEstadoEnum.ERROR_SERVIDOR_NO_RESPONDE, false);
			return false;
		}
		return resultado;
	}

	public boolean validacionHoraRegistrosupdateR(JsonUpdateRequestDto jsonFront, Long id) {
		Validate validate = new Validate();
		try {

			List<RegistroHoraDto> registros = (List<RegistroHoraDto>) (Object) this
					.registersSearch(jsonFront.getData().getDay(), jsonFront.getData().getUser(), validate);
			Timestamp finAnterior = null;
			Timestamp inicioPosterior = null;
			int index = 0;
			for (RegistroHoraDto registro : registros) {
				if (registro.getIdRegistro().equals(id)) {
					if (index != 0) {
						finAnterior = registros.get(index - 1).getEnd();
					}
					if (index != registros.size() - 1) {
						inicioPosterior = registros.get(index + 1).getBegin();
					}
				}
				index++;
			}
			Timestamp actualinicio = (formatoFecha.stringADate(jsonFront.getData().getBegin()));
			Timestamp actualfinal = (formatoFecha.stringADate(jsonFront.getData().getEnd()));
			// before < antes ; after > despues
			if (finAnterior != null || inicioPosterior != null) {
				return (actualinicio.after(finAnterior) && actualfinal.before(inicioPosterior));
			}
			if (finAnterior != null && inicioPosterior == null) {
				return actualinicio.after(finAnterior);
			}
			if (finAnterior == null && inicioPosterior != null) {
				return (actualfinal.before(inicioPosterior) && actualinicio.before(finAnterior));
			}
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > validacionHoraRegistrosupdateR " + e);
			validate.setError(CodigosEstadoEnum.ERROR_SERVIDOR_NO_RESPONDE, false);
			return false;
		}
		validate.setError(CodigosEstadoEnum.OK, true);
		return true;
	}


	public boolean editarRegistroHora(JsonUpdateDto editFrontDto, String token) {
		Date newDate = new Date();
		try {
			RegistroHora rh = findById(editFrontDto.getData().getRegistroId());
			if (rh == null) {
				return false;
			}

			Timestamp cambiaIncio = (FormatoFecha.stringADate(editFrontDto.getData().getBegin()));
			Timestamp cambiaFin = (FormatoFecha.stringADate(editFrontDto.getData().getEnd()));

			if ((rh.getInicio().before(cambiaIncio)) && (rh.getFin().equals(cambiaFin))) {
				return false;
			}

			if ((rh.getFin().before(cambiaFin)) && (rh.getInicio().equals(cambiaIncio))) {
				return false;
			}

			if (cambiaFin.after(cambiaIncio)) {
				rh.setCliente(editFrontDto.getData().getIdCliente() != null
						? clienteDao.findAllById(editFrontDto.getData().getIdCliente())
						: null);
				rh.setLugarTrabajo(editFrontDto.getData().getIdLugarTrabajo() != null
						? lugarTrabajoDao.findAllById(editFrontDto.getData().getIdLugarTrabajo())
						: null);
				rh.setFase(editFrontDto.getData().getIdFase() != null
						? faseDao.findAllById(editFrontDto.getData().getIdFase())
						: null);
				rh.setCaracteristica(TipoEstadoEnum.EDITADO.getNombre());
				rh.setDescripcion(editFrontDto.getData().getTxt());
				rh.setProyectoText(editFrontDto.getData().getProyectoText());
				rh.setProyectoText(editFrontDto.getData().getProyectoText());
				rh.setUsuarioUltimaEdicion(JwtUtils.extraerUsernameDelToken(token));
				rh.setFechaUltimaEdicion(newDate);


				if ((rh.getInicio().equals(cambiaIncio)) && (rh.getFin().equals(cambiaFin))) {
					if (isFinalizado(rh))
						rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
					registroHoraDao.save(rh);
					return true;
				}

				if ((cambiaFin.before(rh.getFin()))) {
					Timestamp finPrevio = rh.getFin();
					rh.setInicio(cambiaIncio);
					rh.setFin(FormatoFecha.stringADate(editFrontDto.getData().getEnd()));
					RegistroHora nuevo = new RegistroHora();
					this.evaluateTipoHora(rh, nuevo);
					if (isFinalizado(rh))
						rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
					rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
					registroHoraDao.save(rh);
					nuevo.setInicio(FormatoFecha.stringADate(editFrontDto.getData().getEnd()));
					nuevo.setCaracteristica(TipoEstadoEnum.NUEVO.getNombre());
					nuevo.setEstadoRegistro(TipoEstadoEnum.PARA_EDITAR.getNombre());
					nuevo.setFin(finPrevio);
					nuevo.setUsuario(usuarioService.findByUsername(editFrontDto.getData().getUser()));
					nuevo.setLider(usuarioService.findByUsername(editFrontDto.getData().getUser()).getLider());
					nuevo.setUsuarioUltimaEdicion(JwtUtils.extraerUsernameDelToken(token));
					nuevo.setFechaUltimaEdicion(newDate);
					nuevo.setEstadoRegistroHora(EstadoRegistroHora.INICIADO);
					registroHoraDao.save(nuevo);
					return true;
				}
			}
		} catch (Exception ex) {
			System.out.println("Error en RegistroHoraService > editarRegistroHora " + ex);
			return false;
		}
		return false;
	}

	public void evaluateTipoHora(RegistroHora registroActual, RegistroHora registroNuevo) {

		if (registroActual.getTipoHora().getNombre().equals(TipoHoraEnum.CAMBIO.getNombre())) {
			registroNuevo.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.CAMBIO.getNombre()));
			registroActual.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.FINALIZADO.getNombre()));
		} else if (registroActual.getTipoHora().getNombre().equals(TipoHoraEnum.FINALIZADO.getNombre())) {
			registroNuevo.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.FINALIZADO.getNombre()));
			registroActual.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.CAMBIO.getNombre()));
		} else {
			registroNuevo.setTipoHora(tipoHoraDao.findAllByNombre(TipoHoraEnum.PRODUCTIVA.getNombre()));
		}

	}

	public boolean editBegin(JsonUpdateBeginDto editBeginFrontDto) {
		try {
			RegistroHora rh = findById(editBeginFrontDto.getData().getRegistroId());
			if (rh == null) {
				return false;
			}
			rh.setCambioInicio(FormatoFecha.stringADate(editBeginFrontDto.getData().getBeginChange()));
			rh.setEstadoRegistro(TipoEstadoEnum.PENDIENTE.getNombre());
			rh.setCaracteristica(TipoEstadoEnum.PEDIDO_EDICION.getNombre());
			rh.setJustificacion(editBeginFrontDto.getData().getJustification());
			registroHoraDao.save(rh);
			return true;
		} catch (Exception ex) {
			System.out.println("Error en RegistroHoraService > editBegin " + ex);
			return false;
		}
	}

	public List listByStatus(JsonStateRequestDto json, String status) {
		// todos de todos segun estado
		List<StateFrontDto> listDto = new ArrayList<>();
		List<RegistroHora> registros = findByStatus(status);

		for (RegistroHora rh : registros) { // recorro los registros
			StateFrontDto dto = new StateFrontDto();
			dto.setRegistroId(rh.getId());
			dto.setBegin(rh.getInicio());
			dto.setBeginChange(rh.getCambioInicio());
			dto.setJustification(rh.getJustificacion());
			dto.setUser(rh.getUsuario().getUsername());

			listDto.add(dto);
		}
		return listDto;
	}

	public List<RegistroHora> findByStatus(String status) {
		return registroHoraDao.findAllByEstadoRegistro(status);
	}

	public boolean aceppt(JsonStateAcepptFrontDto StateAcepptFrontDto) {
		try {
			RegistroHora rh = findById(StateAcepptFrontDto.getData().getRegistroId());
			if (rh == null) {
				return false;
			}
			String estado = (StateAcepptFrontDto.getData().getEstadoRegistro());
			if (estado.equalsIgnoreCase(TipoEstadoEnum.ACEPTADO.getNombre())) {
				rh.setEstadoRegistro(TipoEstadoEnum.ACEPTADO.getNombre());
				Timestamp fecha = rh.getInicio();
				rh.setInicio(rh.getCambioInicio());
				rh.setCambioInicio(fecha);
				rh.setCaracteristica(TipoEstadoEnum.ANALIZADO.getNombre());
				registroHoraDao.save(rh);
				return true;
			}
			if (estado.equalsIgnoreCase(TipoEstadoEnum.RECHAZADO.getNombre())) {
				rh.setEstadoRegistro(TipoEstadoEnum.RECHAZADO.getNombre());
				rh.setCaracteristica(TipoEstadoEnum.ANALIZADO.getNombre());
				registroHoraDao.save(rh);
				return true;
			}

		} catch (Exception ex) {
			System.out.println("Error en RegistroHoraService > aceppt " + ex);
			return false;
		}
		return false;
	}

	public List listaLiderCargo(JsonRegistroPeticionesDto json) {
		// me trae una lista de los que un lider tiene a cargo
		List<StateFrontDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());
		List<RegistroHora> registros = findL(u);

		for (RegistroHora rh : registros) { // recorro los registros
			StateFrontDto dto = new StateFrontDto();
			dto.setRegistroId(rh.getId());
			dto.setBegin(rh.getInicio());
			dto.setBeginChange(rh.getCambioInicio());
			dto.setJustification(rh.getJustificacion());
			dto.setUser(rh.getUsuario().getUsername());
			dto.setEstadoRegistro(rh.getEstadoRegistro());
			listDto.add(dto);
		}
		return listDto;
	}

	public List listaLiderCargoAR(JsonRegistroPeticionesDto json) {
		// me trae una lista de los que un lider tiene a cargo
		List<StateFrontDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());
		List<RegistroHora> registros = findL(u);

		registros.addAll(registroHoraDao.findDelegado(u.getId()));

		for (RegistroHora rh : registros) { // recorro los registros
			try {
				if ((rh.getEstadoRegistro().equals("Aceptado")) || (rh.getEstadoRegistro().equals("Rechazado"))) {
					StateFrontDto dto = new StateFrontDto();
					dto.setRegistroId(rh.getId());
					dto.setBegin(rh.getInicio());
					dto.setBeginChange(rh.getCambioInicio());
					dto.setJustification(rh.getJustificacion());
					dto.setUser(rh.getUsuario().getUsername());
					dto.setEstadoRegistro(rh.getEstadoRegistro());
					listDto.add(dto);
				}

			} catch (Exception e) {
				System.out.println("Error en RegistroHoraService > listaLiderCargoAR: " + e.getMessage());
			}
		}
		return listDto;
	}

	public List findL(Usuario lider) {
		return registroHoraDao.findAllByLiderAndCambioInicioNotNull(lider);
	}

	public List listLiderCargoEstado(JsonRegistroPeticionesDto json, String estado) {
		// me trae una lista de los que un lider tiene a cargo filtrado por el estado
		List<StateFrontDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());

		List<RegistroHora> registros = findle(u, estado);

		registros.addAll(registroHoraDao.findByDelegados(u.getId(),estado));

		for (RegistroHora rh : registros) { // recorro los registros
			StateFrontDto dto = new StateFrontDto();
			dto.setRegistroId(rh.getId());
			dto.setBegin(rh.getInicio());
			dto.setBeginChange(rh.getCambioInicio());
			dto.setJustification(rh.getJustificacion());
			dto.setUser(rh.getUsuario().getUsername());
			dto.setEstadoRegistro(rh.getEstadoRegistro());
			listDto.add(dto);
		}
		return listDto;
	}

	public List findle(Usuario lider, String estado) {
		return registroHoraDao.findAllByLiderAndEstadoRegistro(lider, estado);
	}

	public List listUsuarioEstado(JsonRegistroPeticionesDto json, String estado) {
		// me trae una lista de los registro de usuario comun y su estado
		List<StateFrontDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());
		List<RegistroHora> registros = findur(u, estado);

		for (RegistroHora rh : registros) { // recorro los registros
			StateFrontDto dto = new StateFrontDto();
			dto.setRegistroId(rh.getId());
			dto.setBegin(rh.getInicio());
			dto.setBeginChange(rh.getCambioInicio());
			dto.setJustification(rh.getJustificacion());
			dto.setUser(rh.getUsuario().getUsername());
			dto.setEstadoRegistro(rh.getEstadoRegistro());
			listDto.add(dto);
		}
		return listDto;
	}

	public List<RegistroHora> findur(Usuario usuario, String estado) {
		return registroHoraDao.findAllByUsuarioAndEstadoRegistro(usuario, estado);
	}

	public List listUsuario(JsonRegistroPeticionesDto json) {
		// me trae una lista de los registro de usuario comun y su estado
		List<StateFrontDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());
		List<RegistroHora> registros = registroHoraDao.findByUsuarioAndCambioInicioNotNull(u);

		for (RegistroHora rh : registros) { // recorro los registros
			StateFrontDto dto = new StateFrontDto();
			dto.setRegistroId(rh.getId());
			dto.setBegin(rh.getInicio());
			dto.setBeginChange(rh.getCambioInicio());
			dto.setJustification(rh.getJustificacion());
			dto.setUser(rh.getUsuario().getUsername());
			dto.setEstadoRegistro(rh.getEstadoRegistro());
			listDto.add(dto);
		}
		return listDto;
	}

	public String completoRegistro(RegistroHora registroHora) {

		String palabra = registroHora.getTipoHora().getNombre();
		if (palabra.equals("Productiva") || palabra.equals("Finalizado") || palabra.equals("Cambio")) {
			if ((registroHora.getDescripcion() == null) || (registroHora.getProyectoText() == null)
					|| (registroHora.getFin() == null)) {
				return "Abierto";
			} else {
				return "Cerrado";
			}
		}
		if (palabra.equals("Pausa")) {
			if ((registroHora.getDescripcion() == null) || (registroHora.getFin() == null)) {
				return "Abierto";
			} else {
				return "Cerrado";
			}
		}
		return null;
	}

	public boolean isFinalizado(RegistroHora registroHora) {

		String tipoHora = registroHora.getTipoHora().getNombre();
		if (tipoHora.equals("Productiva") || tipoHora.equals("Finalizado") || tipoHora.equals("Cambio")) {
			return !((registroHora.getDescripcion() == null) || (registroHora.getProyectoText() == null)
					|| (registroHora.getFin() == null));
		}
		if (tipoHora.equals("Pausa")) {
			return !((registroHora.getDescripcion() == null) || (registroHora.getFin() == null));
		}

		return false;
	}

	public List<RegistroHora> findAllBetweenDates(String token, Date desde, Date hasta, String username) {
		try {
			Usuario usuario = usuarioService.findByUsername(username);
			return registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(usuario, desde, hasta);
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > findAllBetweenDates " + e);
			throw e;
		}
	}

	public List findDesdeHasta(JsonFechaDesdeHataUserDto json) {
		Validate validate = new Validate();
		List<RegistroHoraDto> listDto = new ArrayList<>();
		Usuario u = usuarioService.findByUsername(json.getData().getUser());
		Timestamp horaDesde = formatoFecha.stringADate((String) json.getData().getFrom() + HORA_DESDE);
		Timestamp horaHasta = formatoFecha.stringADate((String) json.getData().getUntil() + HORA_HASTA);
		List<RegistroHora> registros = registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(u, horaDesde,
				horaHasta);
		Long suma = 0L;
		for (RegistroHora rh : registros) { // recorro los registros
			RegistroHoraDto dto = new RegistroHoraDto();
			dto.setIdRegistro(rh.getId());
			dto.setUser(rh.getUsuario().getUsername());
			dto.setBegin(rh.getInicio());
			dto.setEnd(rh.getFin() == null ? null : rh.getFin());
			dto.setLugarTrabajo(rh.getLugarTrabajo() == null ? null : rh.getLugarTrabajo().getNombre());
			dto.calcularHoraRango(validate);
			dto.setTipoHora(rh.getTipoHora().getNombre());
			dto.setIdCliente(rh.getCliente() == null ? null : rh.getCliente().getId().toString());
			dto.setClienteText(rh.getProyectoText());
			dto.setDescription(rh.getDescripcion());
			dto.setEstadoRegistro(rh.getEstadoRegistroHora().toString());
			dto.setProyectoText(rh.getProyectoText());
			dto.setLider(rh.getLider() == null ? null : rh.getLider().getId().toString());
			dto.setEstadoGeneral(this.completoRegistro(rh));
			FormatoFecha fecha = new FormatoFecha();
			Timestamp end = dto.getEnd() == null ? fecha.ahorayyyyMMddhhmmss() : dto.getEnd();

			// if (dto.getBegin().before(end)) {
			// Long diff = (CalculoDeHoras.diffDeHoras(dto.getBegin(), dto.getEnd()));
			// suma = diff + suma;
			// }
			// if (dto.getTipoHora().equals("Finalizado")) {
			// dto.setHour(Long.valueOf(suma / 3600000).toString().length() == 1
			// ? "0" + Long.valueOf(suma / 3600000).toString()
			// : Long.valueOf(suma / 3600000).toString());
			// dto.setMinutes(Long.valueOf((suma % 3600000) / 60000).toString().length() ==
			// 1
			// ? "0" + Long.valueOf((suma % 3600000) / 60000).toString()
			// : Long.valueOf((suma % 3600000) / 60000).toString());
			// dto.setHorasDay((dto.getHour() + " : " + dto.getMinutes()) + " hs");
			// }

			if (dto.getTipoHora().equals("Finalizado")) {
				dto.setHour(CalculoDeHoras.diffDeHoras(rh.getInicio(), rh.getFin()).toString());
				dto.setMinutes(CalculoDeHoras.diffDeMinutos(rh.getInicio(), rh.getFin()).toString());
				dto.setHorasDay(dto.getHour() + " : " + dto.getMinutes());
			}
			listDto.add(dto);
		}
		return listDto;
	}

	public List subditosByLider(JsonLiderDto json) {
		try {

			Usuario u = usuarioService.findByUsername(json.getData().getUser());
			List<Usuario> usuarios = usuarioService.findDistinctUsuarioByLider(u.getId());
			List<UsuarioDto> listDto = new ArrayList<>();
			UsuarioDto dtoU = new UsuarioDto(u.getUsername(), u.getNombre(), u.getApellido());
			listDto.add(dtoU);
			for (Usuario rh : usuarios) { // recorro los registros
				UsuarioDto dto = new UsuarioDto(rh.getUsername(), rh.getNombre(), rh.getApellido());
				listDto.add(dto);

			}
			return listDto;
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > subditosByLider " + e);
			return null;
		}

	}

	public Map<String, String> HorasMinutosTrabajados(JsonHorasDto json) {

		Usuario usuario = usuarioService.findByUsername(json.getData().getUser());
		String desde = json.getData().getBegin() + HORA_DESDE;
		String hasta = json.getData().getEnd() + HORA_HASTA;

		return registroHoraDao.horaMinutosTrabajados(usuario.getId(), desde, hasta);

	}

	public List<Map<?, ?>> HorasMinutosTrabajadosXDia(JsonHorasDto json) {

		Usuario usuario = usuarioService.findByUsername(json.getData().getUser());
		String desde = json.getData().getBegin() + HORA_DESDE;
		String hasta = json.getData().getEnd() + HORA_HASTA;
		return registroHoraDao.horasMinutosTrabajadosXDia(usuario.getId(), desde, hasta);

	}

	public ResponseEntity<JsonDto> requestCount(JsonUserDto json) {
		return this.contadorSolicitudes(json);

	}

	private ResponseEntity<JsonDto> contadorSolicitudes(JsonUserDto json) {

		Usuario usuario = usuarioService.findByUsername(json.getData().getUser());
		Long cantidad = registroHoraDao.countByLiderAndEstadoRegistro(usuario, "Pendiente");
		JsonDto JSON = new JsonDto(json.getHeader(), json.getInfo());
		Map<String, Long> mapa = new HashMap<>();
		mapa.put("Solicitudes", cantidad);
		Validate validate = new Validate();
		validate.setSuccess(true);
		validate.setCode(CodigosEstadoEnum.OK);

		return JSON.jsonResponde(mapa, validate);

	}

	public void finalizando() {
		Date newDate = new Date();
		Iterable<Usuario> user = usuarioService.findAll();
		for (Usuario u : user) {
			if (u.getId() == 1) {
				continue;
			}
			Timestamp inicioUser = new Timestamp(FormatoFecha.removeTime(FormatoFecha.getToday()).getTime());
			Timestamp fin = new Timestamp(FormatoFecha.addTime(FormatoFecha.getToday()).getTime());
			Timestamp inicioReal = new Timestamp(FormatoFecha.horaInicio(FormatoFecha.getToday()).getTime());

			UsuarioDisponibilidad usuarioDisponibilidad = usuarioDisponibilidadDao.findUsuarioDispByUsuarioId(u.getId());
			if (usuarioDisponibilidad == null) {
				continue;
			}
			int cantHs = intValue(usuarioDisponibilidad.getHs_diarias());
			int horasCargadas = 0;

			if (registroHoraDao.existsByUsuarioAndInicioBetween(u, inicioUser, fin)) {
				int cont = 0;
				List<RegistroHora> listaRHPorUsuario = registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(u, inicioUser, fin);

				for (RegistroHora rh : listaRHPorUsuario) {
					if (rh.getEstadoRegistroHora() == EstadoRegistroHora.INICIADO && rh.getFin() == null) {
						//cerrar el estado registroHora --> poner codigo de cerrar aca
						if (horasCargadas == 0) {
							rh.setFin(new Timestamp(FormatoFecha.horasInicio(rh.getInicio(), cantHs).getTime()));
						} else {
							rh.setFin(new Timestamp(FormatoFecha.horasInicio(rh.getInicio(), horasCargadas).getTime()));
						}
						rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
						rh.setFechaUltimaEdicion(newDate);
						rh.setUsuarioUltimaEdicion("SISTEMA");
						registroHoraDao.save(rh);
					}
					if ((rh.getTipoHora().getTipo() == TipoHoraEnum.FINALIZADO || rh.getTipoHora().getTipo() == TipoHoraEnum.PRODUCTIVA
							|| rh.getTipoHora().getTipo() == TipoHoraEnum.CAMBIO) && rh.getFin() != null) {
						cont += FormatoFecha.hoursDifference(rh.getFin(), rh.getInicio());
						horasCargadas = cantHs - cont;
					}
					if ((rh.getProyectoText() == null || rh.getProyectoText().isEmpty()) && rh.getTipoHora().getTipo() != TipoHoraEnum.PAUSA) {
						List<ProyectoFasePersona> proyectosProductivosXPersona = proyectoPersonaDao.findByUsuarioAndTipoProyecto(rh.getUsuario(), TipoProyectoEnum.PRODUCTIVA.toString());

						if (proyectosProductivosXPersona.stream().count() == 1) {
							ProyectoFasePersona proj = proyectosProductivosXPersona.get(0);
							String proyectText = proj.getProyecto().getCliente().getNombre() + " / " + proj.getProyecto().getTimesheetCodigoInterno() + " / " + proj.getFase().getNombre();
							rh.setProyectoText(proyectText);
							rh.setFase(proj.getFase());
							TipoHora tH = new TipoHora();
							tH.setId(6L);
							rh.setTipoHora(tH);
							rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
							rh.setDescripcion(proj.getFase().getNombre());
							registroHoraDao.save(rh);
						}
					}
				}

			} else {
				boolean esFeriado = false;
				boolean trabajo = false;
				if (!esFeriado) {
					Feriado feriado = feriadoDao.verificarFeriado(inicioUser);
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(inicioUser);
					if (feriado != null
							|| (calendar.get(Calendar.DAY_OF_WEEK) == 1 || calendar.get(Calendar.DAY_OF_WEEK) == 7)) {
						continue;
					} else {
						esFeriado = true;
					}

					Date hoy = inicioUser;
					int fecha = inicioUser.getDay();

					if (inicioUser.before(new Date()) && !trabajo) {
						switch (fecha) {
							case 1:
								trabajo = usuarioDisponibilidad.getLunes();
								break;
							case 2:
								trabajo = usuarioDisponibilidad.getMartes();
								break;
							case 3:
								trabajo = usuarioDisponibilidad.getMiercoles();
								break;
							case 4:
								trabajo = usuarioDisponibilidad.getJueves();
								break;
							case 5:
								trabajo = usuarioDisponibilidad.getViernes();
								break;
							default:
								trabajo = false;
								break;
						}
					}
					if (!trabajo) {
						continue;
					}
					RegistroHora registrohora = new RegistroHora();
					TipoHora tipoHora = new TipoHora();
					tipoHora.setId(6L);
					registrohora.setUsuario(u);
					registrohora.setLider(u.getLider());
					registrohora.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
					registrohora.setProyectoText("[CDA] - CDA Informática / [NP] - Licencia Injustificada / General");
					registrohora.setTipoHora(tipoHora);
					Fase fase = new Fase();
					fase.setId(260L);
					registrohora.setFase(fase);

					int horasFaltantes = cantHs - horasCargadas;
					Timestamp inicioCalculado = new Timestamp(FormatoFecha.horaInicio(inicioUser).getTime());
					Timestamp finCalculado = new Timestamp(FormatoFecha.horasInicio(inicioCalculado, cantHs).getTime());

					registrohora.setInicio(inicioCalculado);
					registrohora.setFin(finCalculado);
					registrohora.setUsuarioUltimaEdicion("SISTEMA");
					registrohora.setFechaUltimaEdicion(newDate);
					registroHoraDao.save(registrohora);

				}
			}
		}
	}

	public boolean filtrarDiasInvalidos(RegistroHora rh) {

		LocalDate fecha = rh.getInicio().toLocalDateTime().toLocalDate();

		Timestamp inicioDelDia = Timestamp.valueOf(LocalDateTime.of(fecha, LocalTime.MIDNIGHT));
		Timestamp finDelDia = Timestamp.valueOf(LocalDateTime.of(fecha, LocalTime.MAX));

		return !registroHoraDao.existsByUsuarioAndEstadoRegistroHoraAndInicioBetween(rh.getUsuario(),
				EstadoRegistroHora.INICIADO, inicioDelDia, finDelDia);
	}

	public List<RegistroHora> registrosSinCompletarDeHoy(String token) {
		Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
		Timestamp todayBegin = Timestamp.valueOf(LocalDateTime.now().withHour(0).withMinute(0));
		Timestamp todayEnd = Timestamp.valueOf(LocalDateTime.now().withHour(23).withMinute(59));
		List<RegistroHora> registrosDeHoy =
				registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(usuario, todayBegin, todayEnd);
		List<RegistroHora> toReturn = new ArrayList<>();
		try {
			for (RegistroHora reg : registrosDeHoy
			) {
				if (reg.getTipoHora().getTipo().equals(TipoHoraEnum.PAUSA)) {
					if (reg.getDescripcion() == null) {
						toReturn.add(reg);
					}
				} else {
					if (reg.getFase() == null || reg.getLugarTrabajo() == null || reg.getDescripcion() == null) {
						toReturn.add(reg);
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registrosSinCompletarDeHoy: " + e);
			throw e;
		}
		return toReturn;
	}


	public void registrosSinFinDeAyer() {
		Timestamp yesterdayBegin = Timestamp.valueOf(LocalDateTime.now().minusDays(1).withHour(0).withMinute(0));
		Timestamp yesterdayEnd = Timestamp.valueOf(LocalDateTime.now().minusDays(1).withHour(23).withMinute(59));
		List<RegistroHora> registrosSinFin = registroHoraDao.findByFinIsNullAndInicioBetween(yesterdayBegin, yesterdayEnd);
		StringBuilder registrosSinFinString = new StringBuilder();
		try {
			if (registrosSinFin.isEmpty()) {
				LocalDate date = yesterdayBegin.toLocalDateTime().toLocalDate();
				System.out.println("No hubo ningún registro sin cerrar el dia: " + date);
			} else {
				//Construcción del mensaje
				registrosSinFin.forEach(registro -> registrosSinFinString.append(
						"Id Registro: "
								+ registro.getId() + "  USUARIO: "
								+ registro.getUsuario().getUsername()
								+ "\n"));

				//Envío de correo para cada correo en la lista de destinatarios proveniente del properties.

				try {
					emailService.enviarEmailInterno("|| Alerta de registros no finalizados ||",
							"Los siguientes registros no pudieron ser finalizados: \n" + registrosSinFinString);

				} catch (Exception e) {
					System.out.println("Error en RegistroHoraService > registrosSinFinDeAyer: " + e);
				}

			}

		} catch (Exception e) {
			System.out.println("Error en RegistroHoraService > registrosSinFinDeAyer(): " + e);
		}

	}

	/*
	 * Método de consulta de proyecto en registros
	 *
	 *
	 * */

	public boolean proyectExistsInRegisters(Proyecto proyecto) {
		List<RegistroHora> registroHoras = registroHoraDao.findByFaseProyecto(proyecto);

//		for (RegistroHora rh : registroHoras) {
//			Fase fase = rh.getFase();
//			Proyecto proyectoFase = fase.getProyecto();
//			if (proyecto.getId().equals(proyectoFase.getId())) {
//				return true;
//			}
//
//		}
		return !registroHoras.isEmpty();
	}

	public RegistroHora ultimoRegistroDelDia(String token) {
		try {
			Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
			Timestamp desde = Timestamp.valueOf(LocalDateTime.now().withHour(0).withMinute(0));
			Timestamp hasta = Timestamp.valueOf(LocalDateTime.now().withHour(23).withMinute(59));

			return registroHoraDao.findByUsuarioAndFinIsNullAndInicioBetween(usuario, desde, hasta);
		} catch (Exception e) {
			throw e;
		}
	}

	public static Date sumarDias(Date fecha, int dias) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(fecha);
		calendar.add(Calendar.DAY_OF_YEAR,dias);
		return calendar.getTime();
	}


	public static long diasEntreDosFechas(Date fechaDesde) {
		Date fechaActual = new Date();
		long startTime = fechaDesde.getTime();
		long endTime = fechaActual.getTime();
		long diasDesde = (long) Math.floor(startTime / (1000 * 60 * 60 * 24)); // convertimos a dias, para que no afecten cambios de hora
		long diasHasta = (long) Math.floor(endTime / (1000 * 60 * 60 * 24)); // convertimos a dias, para que no afecten cambios de hora
		long dias = diasHasta - diasDesde;

		return dias;
	}

	public static String dateAString(Date fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String fechaComoCadena = sdf.format(fecha);
		return (fechaComoCadena);
	}

	public static ArrayList<Date> fechasDesdeHasta (Date fechaDesde) {

		ArrayList<Date>listaFechas = new ArrayList<>();
		for (int i = 1 ; i <= diasEntreDosFechas(fechaDesde); i++) {
			 listaFechas.add(sumarDias(fechaDesde, i));
		}

		return listaFechas;
	}

	public boolean createDias(RegistroHorasCreacionDiasDto json) throws Exception {
		boolean status = false;
		try {
			ArrayList<String> fechasRegistros = registroHoraDao.rangoFechasDesdeHasta(json.getFechaDesde());
			ArrayList<Date> arrayfechasDesdeHasta = fechasDesdeHasta(json.getFechaDesde());
			for (int i = 0; i < arrayfechasDesdeHasta.size(); i++) {
				if (!fechasRegistros.contains(dateAString(arrayfechasDesdeHasta.get(i)))) {
					Date newDate = new Date();
					Iterable<Usuario> user = usuarioService.findAll();
					for (Usuario u : user) {
						if (u.getId() == 1) {
							continue;
						}
						Timestamp inicioUser = Timestamp.valueOf(dateAString(arrayfechasDesdeHasta.get(i))+ " 00:00:00");
						Timestamp fin = Timestamp.valueOf(dateAString(arrayfechasDesdeHasta.get(i))+ " 23:59:59");

						UsuarioDisponibilidad usuarioDisponibilidad = usuarioDisponibilidadDao.findUsuarioDispByUsuarioId(u.getId());
						if (usuarioDisponibilidad == null) {
							continue;
						}
						int cantHs = intValue(usuarioDisponibilidad.getHs_diarias());
						int horasCargadas = 0;
						if (registroHoraDao.existsByUsuarioAndInicioBetween(u, inicioUser, fin)) {
							int cont = 0;
							List<RegistroHora> listaRHPorUsuario = registroHoraDao.findAllByUsuarioAndInicioBetweenOrderByInicioAsc(u, inicioUser, fin);

							for (RegistroHora rh : listaRHPorUsuario) {
								if (rh.getEstadoRegistroHora() == EstadoRegistroHora.INICIADO && rh.getFin() == null) {
									//cerrar el estado registroHora --> poner codigo de cerrar aca
									if (horasCargadas == 0) {
										rh.setFin(new Timestamp(FormatoFecha.horasInicio(rh.getInicio(), cantHs).getTime()));
									} else {
										rh.setFin(new Timestamp(FormatoFecha.horasInicio(rh.getInicio(), horasCargadas).getTime()));
									}
									rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
									rh.setFechaUltimaEdicion(newDate);
									rh.setUsuarioUltimaEdicion("SISTEMA");
									registroHoraDao.save(rh);
								}
								if ((rh.getTipoHora().getTipo() == TipoHoraEnum.FINALIZADO || rh.getTipoHora().getTipo() == TipoHoraEnum.PRODUCTIVA
										|| rh.getTipoHora().getTipo() == TipoHoraEnum.CAMBIO) && rh.getFin() != null) {
									cont += FormatoFecha.hoursDifference(rh.getFin(), rh.getInicio());
									horasCargadas = cantHs - cont;
								}
								if (rh.getProyectoText() == null || rh.getProyectoText().isEmpty()) {
									List<ProyectoFasePersona> proyectosProductivosXPersona = proyectoPersonaDao.findByUsuarioAndTipoProyecto(rh.getUsuario(), TipoProyectoEnum.PRODUCTIVA.toString());

									if (proyectosProductivosXPersona.stream().count() == 1) {
										ProyectoFasePersona proj = proyectosProductivosXPersona.get(0);
										String proyectText = proj.getProyecto().getCliente().getNombre() + " / " + proj.getProyecto().getTimesheetCodigoInterno() + " / " + proj.getFase().getNombre();
										rh.setProyectoText(proyectText);
										rh.setFase(proj.getFase());
										TipoHora tH = new TipoHora();
										tH.setId(6L);
										rh.setTipoHora(tH);
										rh.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
										registroHoraDao.save(rh);
									}
								}
							}

						} else {
							boolean esFeriado = false;
							boolean trabajo = false;
							if (!esFeriado) {
								Feriado feriado = feriadoDao.verificarFeriado(inicioUser);
								Calendar calendar = Calendar.getInstance();
								calendar.setTime(inicioUser);
								if (feriado != null
										|| (calendar.get(Calendar.DAY_OF_WEEK) == 1 || calendar.get(Calendar.DAY_OF_WEEK) == 7)) {

									continue;
								} else {
									esFeriado = true;
								}

								Date hoy = inicioUser;
								int fecha = inicioUser.getDay();

								if (inicioUser.before(new Date()) && !trabajo) {
									switch (fecha) {
										case 1:
											trabajo = usuarioDisponibilidad.getLunes();
											break;
										case 2:
											trabajo = usuarioDisponibilidad.getMartes();
											break;
										case 3:
											trabajo = usuarioDisponibilidad.getMiercoles();
											break;
										case 4:
											trabajo = usuarioDisponibilidad.getJueves();
											break;
										case 5:
											trabajo = usuarioDisponibilidad.getViernes();
											break;
										default:
											trabajo = false;
											break;
									}
								}
								if (!trabajo) {
									continue;
								}

								RegistroHora registrohora = new RegistroHora();
								TipoHora tipoHora = tipoHoraDao.findAllById(6L);
								registrohora.setUsuario(u);
								registrohora.setLider(u.getLider());
								registrohora.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
								registrohora.setProyectoText("[CDA] - CDA Informática / [NP] - Licencia Injustificada / General");
								registrohora.setTipoHora(tipoHora);
								Fase fase = faseDao.findAllById(260L);
								registrohora.setFase(fase);
								int horasFaltantes = cantHs - horasCargadas;
								Timestamp inicioCalculado = new Timestamp(FormatoFecha.horaInicio(inicioUser).getTime());
								Timestamp finCalculado = new Timestamp(FormatoFecha.horasInicio(inicioCalculado, cantHs).getTime());

								registrohora.setInicio(inicioCalculado);
								registrohora.setFin(finCalculado);
								registrohora.setUsuarioUltimaEdicion("SISTEMA");
								registrohora.setFechaUltimaEdicion(newDate);
								registroHoraDao.save(registrohora);

							}
						}


					}
					status = true;
					System.out.println("DIA CREADO");
				}

			}


		} catch (Exception e) {
			throw e;

		}

		return status;
	}
}





