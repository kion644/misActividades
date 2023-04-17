package com.ca.control.service;

import com.ca.control.dao.*;
import com.ca.control.dto.ParticipantesResponse;
import com.ca.control.dto.TomarLicenciaRequest;
import com.ca.control.dto.UsuarioLicenciaResponse;
import com.ca.control.enums.EstadoLicencia;
import com.ca.control.enums.EstadoRegistroHora;
import com.ca.control.enums.RolInterno;
import com.ca.control.enums.TipoEstadoEnum;
import com.ca.control.model.*;
import com.ca.control.utils.CalculoDeHoras;
import com.ca.control.utils.FormatoFecha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

import static org.aspectj.runtime.internal.Conversions.intValue;

@Service
public class UsuarioLicenciaService {

    @Autowired
    UsuarioService usuarioService;
    @Autowired
    ProyectoPersonaDao proyectoPersonaDao;
    @Autowired
    UsuarioLicenciaDao usuarioLicenciaDao;
    @Autowired
    ArchivoDao archivoDao;
    @Autowired
    FeriadoDao feriadoDao;
    @Autowired
    UsuarioDisponibilidadDao usuarioDisponibilidadDao;

    @Autowired
    AprobacionDao aprobacionDao;

    @Autowired
    RegistroHoraDao registroHoraDao;

    @Autowired
    MensajeLicenciaService mensajeLicenciaService;


    public UsuarioLicenciaResponse pedirLicencia(String token, TomarLicenciaRequest request){
        Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
        ProyectoFasePersona pfp = proyectoPersonaDao.findAllById(request.getIdProyectoPersona());

        // Me creo una licencia vacia y le seteo los datos que corresponden
        UsuarioLicencia licencia = new UsuarioLicencia();
        licencia.setUsuario(usuario);
        licencia.setFechaDesde(FormatoFecha.deStringDate(request.getFechaDesde()));
        licencia.setFechaHasta(FormatoFecha.addTime(FormatoFecha.deStringDate(request.getFechaHasta())));
        licencia.setEstadoLicencia(EstadoLicencia.PENDIENTE_APROBACION_LIDER);
        licencia.setFechaCreacion(new Date());
        licencia.setUltimaModificacion(new Date());
        licencia.setUsuarioModifico(usuario);
        licencia.setProyectoFasePersona(pfp);

        // Compruebo si ya existe una licencia en la fecha seteada
        // Y de ser así returno un error
        Optional<List<UsuarioLicencia>> listaLicencias = usuarioLicenciaDao.obtenerPorId(usuario.getId());

        listaLicencias.ifPresent(
                (value) -> {
                    for (UsuarioLicencia UsuarioLicencia : value) {
                        if (UsuarioLicencia.getFechaDesde().compareTo(licencia.getFechaDesde())
                                * licencia.getFechaDesde()
                                        .compareTo(UsuarioLicencia.getFechaHasta()) >= 0
                                || UsuarioLicencia.getFechaDesde()
                                        .compareTo(licencia.getFechaHasta())
                                        * licencia.getFechaHasta().compareTo(
                                                UsuarioLicencia.getFechaHasta()) >= 0) {
                            throw new IllegalArgumentException(
                                    "Ya existe una licencia dentro de las fechas ingresadas");
                        }
                    }
                });

        /*
         * Al ser una licencia nueva, me creo la coleccion de aprobaciones. Luego, le
         * agrego una
         * aprobacion del lider solo con el usuario y la licencia para dejar por sentado
         * que
         * el lider debe aprobar o desaprobar la licencia
         */
        Map<Usuario, Aprobacion> aprobaciones = new HashMap<Usuario, Aprobacion>();
        Aprobacion aprobacion = new Aprobacion(usuario.getLider(), licencia);
        // Agrego la aprobacion a la lista de aprobaciones
        aprobaciones.put(usuario.getLider(), aprobacion);
        // Seteo a la licencia la lista de aprobaciones
        licencia.setAprobaciones(aprobaciones);

        // Guardo la licencia y la devuelvo
        return getUsuarioLicenciaResponse(usuarioLicenciaDao.save(licencia), token);
    }

    /**
     * Este metodo se encarga, dada una licencia, de buscar el usuario y actualizar
     * la aprobacion dada la desicion.
     * Finalmente, devuelve el objeto actualizado
     *
     * @param token
     * @param aprobado
     * @param id
     * @return
     */
    public UsuarioLicenciaResponse decidirAprobacion(String token, Boolean aprobado, Long id) {
        try {
            //Me traigo el usuario y la licencia de la DB
            Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
            UsuarioLicencia licencia = usuarioLicenciaDao.findById(id).orElseThrow(() -> new IllegalArgumentException("No existe licencia con ese Id"));

            // Me busco dentro de las aprobaciones, la de ese usuario
            Aprobacion aprobacion = licencia.getAprobaciones().get(usuario);

            if (aprobacion == null) {
                aprobacion = aprobacionDao.findAprobacionByDelegacion(usuario.getId(), id);
            }

            // Le seteo la fecha y la decision (aprobado o no)
            aprobacion.setFechaAccion(Timestamp.valueOf(LocalDateTime.now()));
            aprobacion.setAprobado(aprobado);

            // Reemplazo la aprobacion vieja con la que tiene los datos nuevos
            licencia.getAprobaciones().replace(usuario, aprobacion);
            licencia.setUsuarioModifico(usuario);
            licencia.setUltimaModificacion(new Date());

            // Avanzo el workflow, guardo en la DB y devuelvo el objeto actualizado a la
            // response
            // Nota: Por ahora solo existe este unico workflow. (Usuario>Lider>Atencion)
            return getUsuarioLicenciaResponse(usuarioLicenciaDao.save(avanzarEstado(licencia, usuario, aprobado)), token);
        } catch (Exception e) {
            System.out.println("Error en UsuarioLicenciaService > modificarLicencia " + e);
            throw e;
        }
    }

    /**
     * Este metodo contiene la logica que se encarga de avanzar el workflow
     * usuario>lider>atencion
     * IMPORTANTE: Este metodo no guarda en la base de datos. Se debe hacer el save
     * luego de llamarlo.
     *
     * @param licencia
     * @param usuario
     * @param aprobado
     * @return
     */
    private UsuarioLicencia avanzarEstado(UsuarioLicencia licencia, Usuario usuario, Boolean aprobado) {
        // Segun el estado...
        switch (licencia.getEstadoLicencia()) {
            case PENDIENTE_APROBACION_LIDER:
                if (aprobado) {
                    // Si la aprueba, pasa a esperar que la tome Atencion
                    licencia.setEstadoLicencia(EstadoLicencia.PENDIENTE_TOMAR_ATENCION);
                } else {
                    // Si no la aprueba, pasa a rechazado
                    licencia.setEstadoLicencia(EstadoLicencia.RECHAZADA);
                }
                break;
            case PENDIENTE_APROBACION_ATENCION:
                Aprobacion aprobacionAtencion = Optional.ofNullable(licencia.getAprobaciones().get(usuario))
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Ese usuario no esta asignado como aprobador para la licencia"));
                if (aprobacionAtencion.isAprobado()) {
                    // Si la aprueba, queda aceptada
                    licencia.setEstadoLicencia(EstadoLicencia.ACEPTADA);
                } else {
                    // Si no la aprueba, pasa a rechazada
                    licencia.setEstadoLicencia(EstadoLicencia.RECHAZADA);
                }
                break;
        }
        return licencia;
    }

    public List<UsuarioLicenciaResponse> getAllPedidasByUsuario(String token) {

        Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
        List<UsuarioLicencia> lst = usuarioLicenciaDao.findAllByUsuario(usuario).orElse(new ArrayList<>());

        return getUsuarioLicenciaResponseList(lst, token);

    }

    public List<UsuarioLicenciaResponse> getAllByEstado(String token, String estado){
        //Obtengo el usuario que consulta..
        Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
        //Obtengo el enum del estado que quiere consultar..
        EstadoLicencia estadoLicencia = null;
        try {
            estadoLicencia = EstadoLicencia.valueOf(estado);
        } catch (IllegalArgumentException e) {
            estadoLicencia = EstadoLicencia.RECHAZADA;
        }

        List<UsuarioLicencia> toReturn = new ArrayList<>();

        switch (estadoLicencia) {
            case PENDIENTE_APROBACION_LIDER: // El lider viene a fijarse las aprobaciones pendientes
                toReturn = usuarioLicenciaDao.findLicenciasDelegadas( usuario.getId());
                break;
            case PENDIENTE_TOMAR_ATENCION:
                toReturn = usuarioLicenciaDao.findByEstadoLicencia(EstadoLicencia.PENDIENTE_TOMAR_ATENCION);
                break;
            case PENDIENTE_APROBACION_ATENCION:
                if (usuario.getRol().getTipo().equals(RolInterno.LIDER)) {
                    // Si el que consulta es el lider, le muestro las que tienen este estado y a el
                    // asignado
                    toReturn = usuarioLicenciaDao.findByEstadoLicenciaAndAprobaciones_Aprobador(estadoLicencia,
                            usuario);
                } else if (usuario.getRol().getTipo().equals(RolInterno.ATENCION)) {
                    // Si el que consulta es un atencion, le muestro las que tienen el estado, no
                    // importa los asignados
                    toReturn = usuarioLicenciaDao.findByEstadoLicencia(EstadoLicencia.PENDIENTE_APROBACION_ATENCION);
                }
                break;
            default:
                // Historico
                if (usuario.getRol().getTipo().equals(RolInterno.LIDER)) {
                    // Si es un LIDER, le devuelvo todas las licencias donde esta asignado como
                    // aprobador
                    toReturn = usuarioLicenciaDao.findLicenciasDelegadasAprobadas( usuario.getId());
                }
                if (usuario.getRol().getTipo().equals(RolInterno.ATENCION)) {
                    // Si es un ATENCION, le devuelvo todas las licencias donde participo algun
                    // atencion
                    toReturn = usuarioLicenciaDao.findByAprobaciones_Aprobador_Rol(usuario.getRol());
                }
                break;
        }

        return getUsuarioLicenciaResponseList(toReturn, token);
    }

    private UsuarioLicenciaResponse getUsuarioLicenciaResponse(UsuarioLicencia usuarioLicencia, String token) {
        try {
            UsuarioLicenciaResponse dto = new UsuarioLicenciaResponse();
            dto.setIdRegistro(usuarioLicencia.getId());
            dto.setFechaDesde(usuarioLicencia.getFechaDesde().toString());
            dto.setFechaHasta(usuarioLicencia.getFechaHasta().toString());
            dto.setUsuario(usuarioLicencia.getUsuario().getUsername());
            dto.setFecha_creacion(usuarioLicencia.getFechaCreacion());
            dto.setUsuario_Modifico(usuarioLicencia.getUsuarioModifico().getUsername());
            dto.setUltima_modificacion(usuarioLicencia.getUltimaModificacion());
            dto.setDiasPedido(
                    CalculoDeHoras.getDifferenceDays(usuarioLicencia.getFechaDesde(), usuarioLicencia.getFechaHasta()));
            dto.setEstado(usuarioLicencia.getEstadoLicencia().toString());
            dto.setTieneArchivo(archivoDao.existsByUsuarioLicencia(usuarioLicencia));
            dto.setIdProyectoPersona(usuarioLicencia.getProyectoFasePersona().getId());
            dto.setNombre(usuarioLicencia.getProyectoFasePersona().getProyecto().getNombre());
            dto.setAprobadores(usuarioLicencia.getAprobaciones());
            dto.setNotificaciones(mensajeLicenciaService.getNotificacionesByLicencia(usuarioLicencia.getId(), token));

            return dto;
        } catch (Exception e) {
            System.out.println("Error en getUsuarioLicenciaResponse");
            throw e;
        }
    }

    private List<UsuarioLicenciaResponse> getUsuarioLicenciaResponseList(List<UsuarioLicencia> lst, String token) {
        try {
            List<UsuarioLicenciaResponse> toReturn = new ArrayList<>();

            // Por cada registro de la lista, armo el dto y lo agrego a la lista que voy a
            // devolver
            lst.forEach(
                    (usuarioLicencia) -> {
                        try {
                            toReturn.add(getUsuarioLicenciaResponse(usuarioLicencia, token));
                        } catch (NullPointerException e) {
                            System.out.println("El registro de id " + usuarioLicencia.getId()
                                    + " tiene un valor null y no se agrego a la lista");
                        }
                    });
            return toReturn;
        } catch (Exception e) {
            System.out.println("Error en UsuarioLicenciaService > getUsuarioLicenciaResponseList " + e);
            throw e;
        }
    }

    /**
     * Este metodo se usa para asignar un nuevo usuario al grupo de Aprobadores (Por
     * ejm. cuando alguien de atencion "toma" la licencia)
     * Finalmente devuelve la
     *
     * @param token
     * @param id
     * @return
     */
    public UsuarioLicencia asignarLicencia(String token, Long id) {
        try {
            Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
            UsuarioLicencia licencia = usuarioLicenciaDao.findById(id).orElseThrow( () -> new IllegalArgumentException("No existe una licencia con ese id"));

            Map<Usuario, Aprobacion> aprobaciones = licencia.getAprobaciones();
            Aprobacion aprobacion = new Aprobacion(usuario, licencia);
            aprobaciones.put(usuario, aprobacion);

            if (aprobacion.getAprobador().getRol().getTipo().equals(RolInterno.ATENCION)) {
                licencia.setEstadoLicencia(EstadoLicencia.PENDIENTE_APROBACION_ATENCION);
            }

            return usuarioLicenciaDao.save(licencia);
        } catch (Exception e) {
            System.out.println("Error en UsuarioLicenciaService > asignarLicencia " + e);
            throw e;
        }
    }

    public void cargarLicenciasDiarias() {
        Date fecha = FormatoFecha.getToday();
        Feriado feriado = feriadoDao.verificarFeriado(FormatoFecha.removeTime(fecha));
        if (feriado != null) {
            return;
        }
        List<UsuarioLicencia> registros = usuarioLicenciaDao.obtenerLicenciasNoProcesadas();
        int diaSemana = fecha.getDay();
        for (UsuarioLicencia ul : registros) {
            Usuario user = ul.getUsuario();
            UsuarioDisponibilidad usuarioDisponibilidad = usuarioDisponibilidadDao.findUsuarioDispByUsuarioId(user.getId());
            boolean trabajo;
            switch (diaSemana) {
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
            if (!trabajo) {
                continue;
            }

            int cantHs = intValue(usuarioDisponibilidad.getHs_diarias()) ;


            Date horaDesde = FormatoFecha.removeTime(fecha);
            Date horaHasta = FormatoFecha.addTime(fecha);
            Timestamp inicio = new Timestamp(FormatoFecha.horaInicio(fecha).getTime());

            RegistroHora registroDiaLicencia = registroHoraDao.ultimoRegistroDia(user.getId(), horaDesde, horaHasta);

            if (registroDiaLicencia == null) {
                TipoHora tipoHora = new TipoHora();
                tipoHora.setId(3L);
                registroDiaLicencia = new RegistroHora();
                registroDiaLicencia.setUsuario(user);
                registroDiaLicencia.setInicio(inicio);
                registroDiaLicencia.setFin(new Timestamp(FormatoFecha.addOffset(inicio, cantHs).getTime()));
                registroDiaLicencia.setLider(user.getLider());
                registroDiaLicencia.setEstadoRegistro(TipoEstadoEnum.ACEPTADO.name());
                registroDiaLicencia.setEstadoRegistroHora(EstadoRegistroHora.FINALIZADO);
                String proyectText = ul.getProyectoFasePersona().getProyecto().getCliente().getNombre() + " / " + ul.getProyectoFasePersona().getProyecto().getTimesheetCodigoInterno() + " / " + ul.getProyectoFasePersona().getFase().getNombre();
                registroDiaLicencia.setProyectoText(proyectText);
                registroDiaLicencia.setFase(ul.getProyectoFasePersona().getFase());
                registroDiaLicencia.setDescripcion(ul.getProyectoFasePersona().getProyecto().getNombre());
                registroDiaLicencia.setTipoHora(tipoHora);
                registroHoraDao.save(registroDiaLicencia);
            }
        }
    }

    public List<UsuarioLicenciaResponse> getAllActivas(String token) {
        try {
            Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
            Timestamp ahora = new Timestamp(new Date().getTime());

            return getUsuarioLicenciaResponseList(usuarioLicenciaDao
                    .findAllByFechaDesdeBeforeAndFechaHastaAfterAndEstadoLicenciaAndAprobaciones_Aprobador(ahora, ahora,
                            EstadoLicencia.ACEPTADA, usuario)
                    .orElse(new ArrayList<>()), token);
        } catch (Exception e) {
            System.out.println("Error en UsuarioLicenciaService > getAllActivas " + e);
            throw e;
        }
    }

    public List<ParticipantesResponse> getAllParticipantes(Long idLicencia) {
        try {
            List<ParticipantesResponse> toReturn = new ArrayList<>();
            UsuarioLicencia licencia = usuarioLicenciaDao.findById(idLicencia)
                    .orElseThrow(() -> new IllegalArgumentException("No existe licencia con el id " + idLicencia));

            // Agrego a los aprobadores a la response
            licencia.getAprobaciones().forEach(
                    (k, v) -> {
                        ParticipantesResponse response = new ParticipantesResponse();
                        response.setId(k.getId());
                        response.setUsername(k.getUsername());
                        response.setNombre(k.getNombre() + " " + k.getApellido());
                        response.setRol(k.getRol().getTipo().toString());
                        toReturn.add(response);
                    });

            // Agrego al creador de la licencia a la response
            ParticipantesResponse response = new ParticipantesResponse();
            response.setId(licencia.getUsuario().getId());
            response.setUsername(licencia.getUsuario().getUsername());
            response.setNombre(licencia.getUsuario().getNombre() + " " + licencia.getUsuario().getApellido());
            response.setRol(licencia.getUsuario().getRol().getTipo().toString());
            toReturn.add(response);

            return toReturn;
        } catch (Exception e) {
            System.out.println("Error en UsuarioLicenciaService > getAllParticipantes " + e);
            throw e;
        }

    }

    public boolean proyectExistsInProyectoPersona(Proyecto proyecto){
        List<UsuarioLicencia> usuarioLicencias = usuarioLicenciaDao.findByProyectoFasePersonaProyecto(proyecto);
        if(usuarioLicencias.size() >0){
            return true;
        }else{
            return false;
        }
    }

    public Integer getNotificacionesLicenciaByUsuarioAprobador(String token){
        try {
            Usuario usuario = usuarioService.getUsuarioByBearerToken(token);
            Integer toReturn = 0;
            if(usuario.getRol().getTipo().equals(RolInterno.LIDER)) {
                List<UsuarioLicencia> usuarioLicencias = usuarioLicenciaDao.findByEstadoLicenciaAndAprobaciones_Aprobador(EstadoLicencia.PENDIENTE_APROBACION_LIDER, usuario);
               toReturn = usuarioLicencias.size();
            }
            else if(usuario.getRol().getTipo().equals(RolInterno.ATENCION)){
                List<UsuarioLicencia> usuarioLicencias = usuarioLicenciaDao.findByEstadoLicencia(EstadoLicencia.PENDIENTE_TOMAR_ATENCION);
                toReturn = usuarioLicencias.size();
            }
        return toReturn;
        }catch (Exception e){
            throw e;
        }
    }
}
