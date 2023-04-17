package com.ca.control.service;
import com.ca.control.dto.AltaProyectoDto;
import com.ca.control.dao.ClienteDao;
import com.ca.control.dao.FaseDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dao.ProyectoPersonaDao;
import com.ca.control.dto.CierreProyectoDto;
import com.ca.control.dto.ProyectoFaseDto;
import com.ca.control.enums.TipoProyectoEnum;
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Proyecto;
import com.ca.control.model.ProyectoFasePersona;
import com.ca.control.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProyectoService {

    @Autowired
    ProyectoPersonaDao proyectoPersonaDao;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    UsuarioLicenciaService usuarioLicenciaService;

    @Autowired
    RegistroHoraService registroHoraService;

    @Autowired
    FaseDao faseDao;

    @Autowired
    ProyectoDao proyectoDao;

    @Autowired
    ClienteDao clienteDao;

    @Autowired
    CasoNegocioService casoNegocioService;

    public List<ProyectoFaseDto> getLicenciasATomarByUsuario(String username) {

        Usuario usuario = usuarioService.findByUsername(username);

        List<ProyectoFasePersona> licencias = proyectoPersonaDao.findByUsuarioAndTipoProyecto(usuario, TipoProyectoEnum.LICENCIA.toString());

        //Este dto me permite enviar al frontend el nombre del proyecto de forma amigable, pero también
        //El ID del ProyectoFasePersona que es quien relaciona cada usuario con cada fase con cada proyecto
        List<ProyectoFaseDto> dtoToReturn = new ArrayList<>();

        for (ProyectoFasePersona pp : licencias) {
            ProyectoFaseDto dto = new ProyectoFaseDto();

            dto.setId(pp.getId());
            dto.setNombre(pp.getProyecto().getNombre());

            dtoToReturn.add(dto);
        }

        return dtoToReturn;
    }

    public Proyecto findById(long id) throws Exception {
        try{

            return proyectoDao.findById(id).orElseThrow(() -> new Exception("Error al encontrar proyecto: No se encontró ningun proyecto con este id"));

        }
        catch (Exception e) {
            throw e;
        }

    }

    public List<AltaProyectoDto> findAll() throws Exception{
        try{
            List<Proyecto> lst = proyectoDao.getAllProyectosActivos();

            return getAltaProyectoDto(lst);
        }
        catch (Exception e) {
            throw e;
        }
    }

    public List<AltaProyectoDto> findAllProductiva() throws Exception {
        try {
            List<Proyecto> lst = proyectoDao.getAllProyectosTipoProductiva();
            return  getAltaProyectoDto(lst);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Proyecto> findProyectoByCasoNegocio(CasoNegocio casoNegocio){
        try {
            return proyectoDao.findAllByCasoNegocio(casoNegocio);
        }catch (Exception e){
            throw e;
        }
    }

    public List<AltaProyectoDto> findAllProductivaActivo() throws Exception {
        try {
            List<Proyecto> lst = proyectoDao.getAllProyectosTipoProductivaActivo();
            return  getAltaProyectoDto(lst);
        } catch (Exception e) {
            throw e;
        }
    }



    public List<AltaProyectoDto> getAltaProyectoDto(List<Proyecto> lst){
        try {

            List<AltaProyectoDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (proyecto) -> {
                        try{
                            AltaProyectoDto dto = new AltaProyectoDto(
                                    proyecto.getId(),
                                    proyecto.getNombre(),
                                    proyecto.getDescripcion(),
                                    proyecto.getEstado(),
                                    proyecto.getCliente().getId(),
                                    //proyecto.getLider().getIdLider(),
                                    proyecto.getCliente().getNombre(),
                                    proyecto.getTimesheetClaveProyecto(),
                                    proyecto.getTimesheetCodigoInterno(),
                                    proyecto.getTipoproyecto(),
                                    proyecto.getFechaInicio(),
                                    proyecto.getFechaFinEstimada(),
                                    proyecto.getFechaFinReal(),
                                    proyecto.getFechaAlta(),
                                    proyecto.getHorasCliente(),
                                    proyecto.getCasoNegocio() != null ? proyecto.getCasoNegocio().getId() : null,
                                    proyecto.getFechaUltimaActualizacion()
                                    

                            );
                            toReturn.add(dto);

                        }catch (Exception e){
                            System.out.println("El proyecto de id " + proyecto.getId() + " tiene un valor null");

                        }
                    }
            );
            return toReturn;

        }catch (Exception e) {
            System.out.println("Error en ProyectoService > getAltaProyectoDto " + e);
            return null;
        }
    }

    public boolean createProyecto(AltaProyectoDto json) throws Exception {

        try {
            if (proyectoDao.existsByNombreAndClienteId(json.getNombre(), json.getIdCliente())){
                throw new Exception("Ya existe el nombre del proyecto con este cliente");
            }
            else{
                Proyecto proyectoNuevo = new Proyecto();
                proyectoNuevo.setNombre(json.getNombre());
                proyectoNuevo.setDescripcion(json.getDescripcion());
                proyectoNuevo.setEstado(json.getEstado());
                proyectoNuevo.setCliente(clienteDao.findById(json.getIdCliente()).orElseThrow(() -> new Exception("Error al crear proyecto: El cliente ingresado no se ha encontrado")));
 
                proyectoNuevo.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto());
                proyectoNuevo.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno());
  
                proyectoNuevo.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto() != null ? json.getTimesheetClaveProyecto() : null);
                proyectoNuevo.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno() != null ? json.getTimesheetCodigoInterno() : null);
                proyectoNuevo.setFechaInicio(json.getFechaInicio());
                proyectoNuevo.setFechaFinEstimada(json.getFechaFinEstimada());
                proyectoNuevo.setHorasCliente(json.getHorasCliente());
                proyectoNuevo.setCasoNegocio(casoNegocioService.findById(json.getIdCasoNegocio()));
                proyectoNuevo.setTipoProyecto(json.getTipoProyecto());
                proyectoNuevo.setFechaAlta(json.getFechaAlta());
                proyectoDao.save(proyectoNuevo);
                return true;
            }
        }
        catch (Exception e){
            throw e;
        }
    }

    public boolean editProyecto(AltaProyectoDto json) throws Exception {
        try {

            Proyecto proyectoAEditar = proyectoDao.findById(json.getId()).orElseThrow(() -> new Exception("Error al editar proyecto: El proyecto con el id ingresado no se ha encontrado"));
            if (registroHoraService.proyectExistsInRegisters(proyectoAEditar) || usuarioLicenciaService.proyectExistsInProyectoPersona(proyectoAEditar)) {
                throw new Exception("Error al editar proyecto: El proyecto esta en uso");
            }
            proyectoAEditar.setNombre(json.getNombre() != null ? json.getNombre() : proyectoAEditar.getNombre());
            proyectoAEditar.setDescripcion(json.getDescripcion() != null ? json.getDescripcion() : proyectoAEditar.getDescripcion());
            proyectoAEditar.setEstado(json.getEstado() != null ? json.getEstado() : proyectoAEditar.getEstado());
            proyectoAEditar.setCliente(json.getIdCliente() != null ? clienteDao.findById(json.getIdCliente()).orElseThrow(() -> new Exception("Error al crear proyecto: El cliente ingresado no se ha encontrado")) : proyectoAEditar.getCliente());

            proyectoAEditar.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto() != null ? json.getTimesheetClaveProyecto() : proyectoAEditar.getTimesheetClaveProyecto());
            proyectoAEditar.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno() != null ? json.getTimesheetCodigoInterno() : proyectoAEditar.getTimesheetCodigoInterno());
  
            proyectoAEditar.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto() == null ? null : proyectoAEditar.getTimesheetClaveProyecto());
            proyectoAEditar.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno() == null ? null : proyectoAEditar.getTimesheetCodigoInterno());
            proyectoAEditar.setHorasCliente(json.getHorasCliente());
            proyectoAEditar.setTipoProyecto(json.getTipoProyecto());
            proyectoAEditar.setFechaUltimaActualizacion(json.getFechaUltimaActualizacion());

            proyectoAEditar.setCasoNegocio(casoNegocioService.findById(json.getIdCasoNegocio()));
            proyectoDao.save(proyectoAEditar);
            return true;
        }
        catch (Exception e) {
            throw e;
        }
    }

    public boolean copyProyecto(AltaProyectoDto json) throws Exception {
        try {
            Proyecto proyectoAcopiar = proyectoDao.findById(json.getId()).orElseThrow(() -> new Exception("Error al copiar proyecto: El proyecto con el id ingresado no se ha encontrado"));
            Proyecto copia = new Proyecto();
            proyectoAcopiar.setNombre(json.getNombre() != null ? json.getNombre() : proyectoAcopiar.getNombre());
            proyectoAcopiar.setDescripcion(json.getDescripcion() != null ? json.getDescripcion() : proyectoAcopiar.getDescripcion());
            proyectoAcopiar.setEstado(json.getEstado() != null ? json.getEstado() : proyectoAcopiar.getEstado());
            proyectoAcopiar.setCliente(json.getIdCliente() != null ? clienteDao.findById(json.getIdCliente()).orElseThrow(() -> new Exception("Error al copiar proyecto: El cliente ingresado no se ha encontrado")) : proyectoAcopiar.getCliente());
 
            proyectoAcopiar.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto() != null ? json.getTimesheetClaveProyecto() : proyectoAcopiar.getTimesheetClaveProyecto());
            proyectoAcopiar.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno() != null ? json.getTimesheetCodigoInterno() : proyectoAcopiar.getTimesheetCodigoInterno());
  
            proyectoAcopiar.setTimesheetClaveProyecto(json.getTimesheetClaveProyecto() == null ? null : proyectoAcopiar.getTimesheetClaveProyecto());
            proyectoAcopiar.setTimesheetCodigoInterno(json.getTimesheetCodigoInterno() == null ? null : proyectoAcopiar.getTimesheetCodigoInterno());
  
            proyectoAcopiar.setTipoProyecto(json.getTipoProyecto());
            proyectoDao.save(copia);
            return true;
        }
        catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteProyecto(Integer id) throws Exception {
        try {
            Proyecto proyectoABorrar = proyectoDao.findById(Long.valueOf(id)).orElseThrow(() -> new Exception("Error al eliminar proyecto: No se encontró ningun proyecto con este Id"));
            
            if (registroHoraService.proyectExistsInRegisters(proyectoABorrar) || usuarioLicenciaService.proyectExistsInProyectoPersona(proyectoABorrar)) {
                throw new Exception("Error al eliminar proyecto: El proyecto esta en uso");
            } else {
                proyectoDao.deleteById(proyectoABorrar.getId());
                return true;
            }
            
        }
        catch (Exception e){
            throw e;
        }
    }

    public boolean cerrarProyecto(CierreProyectoDto dto) {
        try{
            Proyecto proyectoCerrar = proyectoDao.findById(dto.getId_proyecto()).get();
            proyectoCerrar.setFechaFinReal(dto.getFechaCierreProyecto());
            proyectoCerrar.setComentarioCierreProyecto(dto.getComentarioCierre());
            proyectoCerrar.setEstado(dto.getEstadoCierre());
            proyectoDao.save(proyectoCerrar);

            return true;

        } catch (Exception e){
            throw e;
        }





    }
}
