package com.ca.control.controller;

import com.ca.control.dao.RegistroHoraDao;
import com.ca.control.dto.*;
import com.ca.control.enums.CodigosEstadoEnum;
import com.ca.control.enums.TipoEstadoEnum;
import com.ca.control.model.RegistroHora;
import com.ca.control.service.RegistroHoraService;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.BadRequestException;
import java.sql.Timestamp;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")

public class RegistroHoraController {

    @Autowired
    RegistroHoraDao registroHoraDao;

    @Autowired
    RegistroHoraService registroHoraService;

    private static final Logger logger = LoggerFactory.getLogger(RegistroHoraController.class);

    @RequestMapping(value = "/HorasTrabajadas", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> horasTrabajadas(@RequestBody JsonHorasTrabajadasRequestDto json) {
        try{
            return registroHoraService.hoursWorked(json);
        }catch (Exception e){
            logger.error("Error en RegistroHoraController > horasTrabajadas: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/registroSinFinalizar", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> buscarRegistroDeHoraSinFinalizar(@RequestBody JsonDto json) {

        try{
            return registroHoraService.unfinishedRegister(json);
        }catch (Exception e){
            logger.error("Error en RegistroHoraController > registroSinFinalizar: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/reiniciar", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> reiniciar(@RequestBody JsonInicioPausaReinicioRequestDto json) {

        try{
            JsonListDto jsonResponse = new JsonListDto();
            return registroHoraService.restartPause(json);

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > reiniciar: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }

    }

    @PostMapping(path = "/inicio")
    public ResponseEntity<JsonDto> inicioDia(@RequestBody JsonInicioPausaReinicioRequestDto json) {
        try{
            return registroHoraService.iniciarDia(json);

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > inicioDia: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(path = "/pausar")
    public ResponseEntity<JsonListDto> pausa(@RequestBody JsonInicioPausaReinicioRequestDto json) {
        try{
            return registroHoraService.restartPause(json);

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > pausa: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/finalizarRegistroHora", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> finalizarRegistroHora(@RequestBody JsonFinalizarRequestDto json) {

        try{
            return registroHoraService.finalizeRegistroHora(json);

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > finalizarDia: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/finalizarJornada")
    public ResponseEntity<RegistroHora> finalizarJornada(@RequestBody FinalizarFrontDto json){
        try {
            return new ResponseEntity<>(registroHoraService.finalizarJornada(json), HttpStatus.OK);

        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > finalizarJornada: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @RequestMapping(value = "/status", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> status(@RequestBody JsonUserDayRequestDto json) {

           try{
               return registroHoraService.stateOfTheDay(json);
           }catch (Exception e){
               logger.error("Error en RegistroHoraController > status: {}", e.getMessage());
               return ResponseEntity.internalServerError().build();
           }

    }

   @PostMapping(path = "/registroHoras")
   public ResponseEntity<JsonListDto> getHorasDeHoyPorUsuario(@RequestBody JsonUserDayRequestDto json) {
            try {
                return registroHoraService.userRegistrosHoraListByDay(json);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > getHorasDeHoyPorUsuario: {}", e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

   }

    @PostMapping(path = "registroHorasRechazados")
    public ResponseEntity<JsonListDto> getHorasRechazadas(@RequestBody JsonStateRequestDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listByStatus(json, TipoEstadoEnum.RECHAZADO.getNombre()));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > getHorasRechazadas: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @PostMapping(path = "/registroHorasAceptados")
    public ResponseEntity<JsonListDto> getHorasAceptadas(@RequestBody JsonStateRequestDto json) {
            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listByStatus(json, TipoEstadoEnum.ACEPTADO.getNombre()));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > getHorasAceptadas: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);
    }

    @PostMapping(path = "/registroHorasPendientes")
    public ResponseEntity<JsonListDto> getHorasPendientes(@RequestBody JsonStateRequestDto json) {
            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listByStatus(json, TipoEstadoEnum.PENDIENTE.getNombre()));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > getHorasPendientes: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);
    }

    @PostMapping(path = "/registroHorasCreate")
    public ResponseEntity<JsonCreateRequestDto> create(@RequestBody JsonCreateRequestDto json, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        JsonCreateRequestDto jsonResponse = new JsonCreateRequestDto();
            InfoDto responseInfo = new InfoDto("resource created successfully", String.valueOf(CodigosEstadoEnum.OK_CREADO.getCodigo()));
            JsonCreateRequestDto responseBody = new JsonCreateRequestDto(json.getHeader(), new CreateFrontDto(), responseInfo);
            return registroHoraService.createRegistroHora(json, token) ? ResponseEntity.ok().body(responseBody)
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping(path = "/registroHorasDelete")
    public ResponseEntity<JsonDeleteRequestDto> deleteById(@RequestBody JsonDeleteRequestDto json) {

            InfoDto responseInfo = new InfoDto("resource deleted successfully", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            JsonDeleteRequestDto responseBody = new JsonDeleteRequestDto(json.getHeader(), new DeleteFrontDto(), responseInfo);
            return registroHoraService.deleteRegistroHora(json) ? ResponseEntity.ok().body(responseBody)
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping(value = "/registroHoras")
    public ResponseEntity<RegistroHora> updateRegistroHora(@RequestBody EditarRegistroHoraRequest request) {
        try {
            return new ResponseEntity<>(registroHoraService.updateRegistroHora(request), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            logger.error("Error en RegistroHoraController > updateRegistroHora: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/editarDetalle", method = RequestMethod.POST)
    public ResponseEntity<JsonUpdateDto> updateById(@RequestBody JsonUpdateDto json, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
            InfoDto responseInfo = new InfoDto("resource updated successfully", String.valueOf(CodigosEstadoEnum.Ok_ACTUALIZADO.getCodigo()));
            JsonUpdateDto responseBody = new JsonUpdateDto(json.getHeader(), new EditFrontDto(), responseInfo);
            return registroHoraService.editarRegistroHora(json, token) ? ResponseEntity.ok().body(responseBody)
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @RequestMapping(value = "/editarInicio", method = RequestMethod.POST)
    public ResponseEntity<JsonUpdateBeginDto> updateById(@RequestBody JsonUpdateBeginDto json) {
            InfoDto responseInfo = new InfoDto("resource updated successfully", String.valueOf(CodigosEstadoEnum.Ok_ACTUALIZADO.getCodigo()));
            JsonUpdateBeginDto responseBody = new JsonUpdateBeginDto(json.getHeader(), new EditBeginFrontDto(), responseInfo);
            return registroHoraService.editBegin(json) ? ResponseEntity.ok().body(responseBody)
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @RequestMapping(value = "/aceptacion", method = RequestMethod.POST)
    public ResponseEntity<JsonStateAcepptFrontDto> statusAcceptance(@RequestBody JsonStateAcepptFrontDto json) {

            InfoDto responseInfo = new InfoDto("resource created successfully", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            JsonStateAcepptFrontDto responseBody = new JsonStateAcepptFrontDto(json.getHeader(), responseInfo);
            return registroHoraService.aceppt(json) ? ResponseEntity.ok().body(responseBody)
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();


    }

    @RequestMapping(value = "/registroLiderCargo", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> acargoLider(@RequestBody JsonRegistroPeticionesDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listaLiderCargo(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > acargoLider: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/registroLiderCargoAR", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> acargoLiderAR(@RequestBody JsonRegistroPeticionesDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listaLiderCargoAR(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > acargoLiderAR: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/registroLiderCargoEstado", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> acargoLiderEstado(@RequestBody JsonRegistroPeticionesDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                String estado = json.getData().getEstadoRegistro();
                if (estado.equals(TipoEstadoEnum.PENDIENTE.getNombre())) {
                    jsonDto.setData(registroHoraService.listLiderCargoEstado(json, TipoEstadoEnum.PENDIENTE.getNombre()));
                }
                if (estado.equals(TipoEstadoEnum.ACEPTADO.getNombre())) {
                    jsonDto.setData(registroHoraService.listLiderCargoEstado(json, TipoEstadoEnum.ACEPTADO.getNombre()));
                }
                if (estado.equals(TipoEstadoEnum.RECHAZADO.getNombre())) {
                    jsonDto.setData(registroHoraService.listLiderCargoEstado(json, TipoEstadoEnum.RECHAZADO.getNombre()));
                }
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > acargoLiderEstado: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/registroUsuarioEstado", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> listaEstadoUsuario(@RequestBody JsonRegistroPeticionesDto json) {
            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                String estado = json.getData().getEstadoRegistro();
                if (estado.equals(TipoEstadoEnum.PENDIENTE.getNombre())) {
                    jsonDto.setData(registroHoraService.listUsuarioEstado(json, TipoEstadoEnum.PENDIENTE.getNombre()));
                }
                if (estado.equals(TipoEstadoEnum.ACEPTADO.getNombre())) {
                    jsonDto.setData(registroHoraService.listUsuarioEstado(json, TipoEstadoEnum.ACEPTADO.getNombre()));
                }
                if (estado.equals(TipoEstadoEnum.RECHAZADO.getNombre())) {
                    jsonDto.setData(registroHoraService.listUsuarioEstado(json, TipoEstadoEnum.RECHAZADO.getNombre()));
                }
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > listaEstadoUsuario: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/registroUsuario", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> listaUsuario(@RequestBody JsonRegistroPeticionesDto json) {
            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.listUsuario(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > listaUsuario: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @GetMapping(value = "/registroHoras")
    public ResponseEntity<List<RegistroHora>> getByUsuarioEntreFechas(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestParam Timestamp desde, @RequestParam Timestamp hasta, @RequestParam String usuario){
        try {
            return new ResponseEntity<>(registroHoraService.findAllBetweenDates(token, desde, hasta, usuario), HttpStatus.OK);
        } catch (Exception e){
            logger.error("Error en RegistroHoraController > getByUsuarioEntreFechas: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/fechaDesdeHastabyUsuario", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> fechaDesdeHastaByUsuario(@RequestBody JsonFechaDesdeHataUserDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.findDesdeHasta(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > fechaDesdeHastaByUsuario: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }


    @RequestMapping(value = "/subditos", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> minions(@RequestBody JsonLiderDto json) {

            JsonListDto jsonDto = new JsonListDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.subditosByLider(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > minions: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/Horarios", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> Horarios(@RequestBody JsonHorasDto json) {

            JsonDto jsonDto = new JsonDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setHeader(json.getHeader());
                jsonDto.setData(registroHoraService.HorasMinutosTrabajados(json));
                jsonDto.setInfo(responseInfo);
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > Horarios: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);

    }

    @RequestMapping(value = "/HorariosxDia", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> HorariosXdia(@RequestBody JsonHorasDto json) {
            JsonDto jsonDto = new JsonDto();
            InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
            try {
                jsonDto.setData(registroHoraService.HorasMinutosTrabajadosXDia(json));
            } catch (Exception e) {
                logger.error("Error en RegistroHoraController > HorariosxDia: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(jsonDto);
    }

    @RequestMapping(value = "/CambioTarea", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> cambioTarea(@RequestBody JsonFinalizarRequestDto json) {
        return registroHoraService.getDayIncomplete(json);
    }

    @RequestMapping(value = "/cantidadSolicitudes", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> inicioDia(@RequestBody JsonUserDto json) {
        JsonDto jsonResponse = new JsonDto();
        return registroHoraService.requestCount(json);
    }

    @GetMapping(path = "/registroHoras/sinCompletarHoy")
    public ResponseEntity<List<RegistroHora>> registrosSinCompletarHoy(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try {

            return new ResponseEntity<>(registroHoraService.registrosSinCompletarDeHoy(token), HttpStatus.OK);

        }catch (Exception e){
            logger.error("Error en RegistroHoraController > registrosSinCompletarHoy: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/registroHoras/ultimoDelDia")
    public ResponseEntity<RegistroHora> ultimoRegistroDelDia(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try {
            return new ResponseEntity<>(registroHoraService.ultimoRegistroDelDia(token), HttpStatus.OK);
        }catch (Exception e){
            logger.error("Error en RegistroHoraController > ultimoRegistroDelDia: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(path = "/registroHorasCreacionDias")
    public ResponseEntity createDias(@RequestBody RegistroHorasCreacionDiasDto json){
        try{

            return registroHoraService.createDias(json) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){
            logger.error("Error en CreateDiasController > createDias: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
