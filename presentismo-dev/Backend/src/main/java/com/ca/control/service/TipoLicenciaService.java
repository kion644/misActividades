package com.ca.control.service;

import com.ca.control.dao.ClienteDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dao.ProyectoPersonaDao;
import com.ca.control.enums.EstadoProyecto;
import com.ca.control.enums.TipoProyectoEnum;
import com.ca.control.model.Fase;
import com.ca.control.model.Proyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoLicenciaService {

    @Autowired
    ProyectoDao proyectoDao;
    @Autowired
    ProyectoPersonaDao proyectoPersonaDao;
    @Autowired
    ClienteDao clienteDao;

    @Autowired
    UsuarioLicenciaService usuarioLicenciaService;

    @Autowired
    RegistroHoraService registroHoraService;

    @Autowired
    FaseService faseService;

    public List<Proyecto> findAll() throws Exception {
        try {
            List<Proyecto> lst = proyectoDao.getAllProyectosTipoLicencia();
            return lst;
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean createTipoLicencia(Proyecto proyecto, Integer clienteId) throws Exception {
        try {
            proyecto.setCliente(clienteDao.findById(Long.valueOf(clienteId)).orElseThrow(
                    () -> new Exception("Error al crear tipo licencia: No se encontró ningun cliente con este Id")));
            if (proyecto.getTipoproyecto() != TipoProyectoEnum.LICENCIA) {
                throw new Exception("El proyecto a crear no es una licencia");
            } else {
                if (proyectoDao.existsProyectoByNombre(proyecto.getNombre())) {
                    throw new Exception("Ya existe un proyecto licencia con este nombre");
                } else {
                    if (proyectoDao.existsProyectoByTimesheetCodigoInterno(proyecto.getTimesheetCodigoInterno() == null ? "" : proyecto.getTimesheetClaveProyecto())) {
                        throw new Exception("Ya existe un proyecto licencia con este codigo interno");
                    } else {
                        if (proyectoDao.existsProyectoByTimesheetClaveProyecto(proyecto.getTimesheetClaveProyecto() == null ? "" : proyecto.getTimesheetClaveProyecto())) {
                            throw new Exception("Ya existe un proyecto licencia con esta clave");
                        } else {
                            proyectoDao.save(proyecto);
                            return true;
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean cambioDeEstado(Long proyectoId) throws Exception {
        try {
            Proyecto proyectoAEditar = proyectoDao.findById(proyectoId).orElseThrow(
                    () -> new Exception("Error al editar estado: El proyecto con el id ingresado no se ha encontrado"));
            if (proyectoAEditar.getTipoproyecto() != TipoProyectoEnum.LICENCIA) {
                throw new Exception("Error al editar estado: El proyecto no es una licencia");
            } else {
                if (proyectoAEditar.getEstado() == EstadoProyecto.DESACTIVO) {
                    proyectoAEditar.setEstado(EstadoProyecto.ACTIVO);
                } else {
                    proyectoAEditar.setEstado(EstadoProyecto.DESACTIVO);
                }
                proyectoDao.save(proyectoAEditar);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteTipoLicencia(Integer id) throws Exception {
        try {
            Proyecto proyectoAEliminar = proyectoDao.findById(Long.valueOf(id)).orElseThrow(
                    () -> new Exception(
                            "Error al eliminar tipo licencia: El proyecto con el id ingresado no se ha encontrado"));
            if (proyectoAEliminar.getTipoproyecto() != TipoProyectoEnum.LICENCIA) {
                throw new Exception("Error al eliminar tipo licencia: El proyecto no es una licencia");
            } else if (registroHoraService.proyectExistsInRegisters(proyectoAEliminar) || usuarioLicenciaService.proyectExistsInProyectoPersona(proyectoAEliminar)) {
                throw new Exception("Error al eliminar tipo licencia: El proyecto está en uso");
            } else {
                proyectoDao.deleteById(proyectoAEliminar.getId());
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean updateTipoLicencia(Proyecto proyecto, Integer clienteId) throws Exception {
        try {
            Proyecto proyectoAModificar = proyectoDao.findById(proyecto.getId()).orElseThrow(
                    () -> new Exception(
                            "Error al editar tipo licencia: El proyecto con el id ingresado no se ha encontrado"));
            if (proyectoAModificar.getTipoproyecto() != TipoProyectoEnum.LICENCIA) {
                throw new Exception("Error al editar tipo licencia: El proyecto no es una licencia");
            } else if (registroHoraService.proyectExistsInRegisters(proyecto) || usuarioLicenciaService.proyectExistsInProyectoPersona(proyecto)) {
                throw new Exception("Error al editar tipo licencia: El proyecto está en uso");
            } else {
                proyectoAModificar.setDescripcion(proyecto.getDescripcion());
                proyectoAModificar.setEstado(proyecto.getEstado());
                proyectoAModificar.setNombre(proyecto.getNombre());
                proyectoAModificar.setTimesheetClaveProyecto(proyecto.getTimesheetClaveProyecto() == null ? null : proyecto.getTimesheetClaveProyecto());
                proyectoAModificar.setTimesheetCodigoInterno(proyecto.getTimesheetCodigoInterno() == null ? null : proyecto.getTimesheetClaveProyecto());
                proyectoAModificar.setTipoProyecto(proyecto.getTipoproyecto());
                proyectoAModificar
                        .setCliente(clienteDao.findById(Long.valueOf(clienteId)).orElseThrow(() -> new Exception(
                                "Error al editar tipo licencia: El cliente con el id ingresado no se ha encontrado")));
                proyectoDao.save(proyectoAModificar);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

}
