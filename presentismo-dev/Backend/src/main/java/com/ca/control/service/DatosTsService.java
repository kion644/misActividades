
package com.ca.control.service;

import com.ca.control.dao.ClienteDao;
import com.ca.control.dao.FaseDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dao.ProyectoPersonaDao;
import com.ca.control.dto.TSProyectoDto;
import com.ca.control.enums.EstadoProyecto;
import com.ca.control.enums.TipoProyectoEnum;
import com.ca.control.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class DatosTsService {

    @Autowired
    FaseDao faseDao;

    @Autowired
    ProyectoPersonaDao proyectoPersonaDao;

    @Autowired
    ProyectoDao proyectoDao;


    @Autowired
    ClienteDao clienteDao;

    public void updateProyectByUsuario(TSProyectoDto[] jsonTs, Usuario u) throws Exception {

        try {
            List<ProyectoFasePersona> rel = proyectoPersonaDao.findByUserPersona(u);
            for (ProyectoFasePersona proyectoP : rel){
                boolean anyMatch = Arrays.asList(jsonTs).stream().anyMatch(x -> x.getCodigo().equals(proyectoP.getProyecto().getTimesheetClaveProyecto()));
                if(!anyMatch){
                    proyectoP.sethabilitado(false);
                    proyectoPersonaDao.save(proyectoP);
                }   
            }
            for (TSProyectoDto tsProyecto : jsonTs) {
                try {

                    //Guardo el cliente si no existe
                    Cliente cliente = new Cliente(); 
                    cliente = clienteDao.findByNombre(tsProyecto.getCliente());

                    if (cliente == null) {
                      
                        cliente = new Cliente();
                        cliente.setNombre(tsProyecto.getCliente());
                        clienteDao.save(cliente);
                    }
                
                    //Guardo el proyecto si no existe
                    Proyecto proyectoNuestro = new Proyecto();
                    proyectoNuestro = proyectoDao.findByTimesheetClaveProyecto(tsProyecto.getCodigo());

                    if (proyectoNuestro == null) {
                        
                        Proyecto proyecto = this.updateProyecto(tsProyecto, cliente);
                        proyectoNuestro = proyecto;
                        
                    } 

                    //Guardo la fase si no existe
                    Fase fase = new Fase();
                    fase = faseDao.findFaseByTimesheetCodigoFaseAndProyectoId(proyectoNuestro.getId(), tsProyecto.getCodigoFase());

                    if(fase == null) fase = this.updateFase(tsProyecto, proyectoNuestro);

                    //Guardo el proyectopersona si no existe
                    ProyectoFasePersona proyectoFasePersona = new ProyectoFasePersona();

                    if(!proyectoPersonaDao.existsProyectoPersonaByUserPersonaAndProyectoAndFase(u, proyectoNuestro, fase)){

                        proyectoFasePersona.setProyecto(proyectoNuestro);
                        proyectoFasePersona.setUserPersona(u);
                        proyectoFasePersona.setFase(fase);
                        proyectoPersonaDao.save(proyectoFasePersona);

                        if(!proyectoPersonaDao.isProyectoPersonaEnabled(u, proyectoNuestro, fase)){

                            proyectoFasePersona.sethabilitado(true);
                            proyectoPersonaDao.save(proyectoFasePersona);
                        }
                    }

                } catch (Exception e) {
                    System.out.println("Error en DatosTsService > updateProyectByUsuario " + e);
                    throw new Exception("Error al querer actualizar los proyectos de TimeSheet a Mis Actividades");
                }
            }
        } catch (Exception e) {
            System.out.println("Error en DatosTsService > updateProyectByUsuario" + e);
            throw new Exception("Error al querer actualizar los proyectos de TimeSheet a Mis Actividades");

        }
    }

    public Fase updateFase(TSProyectoDto tsProyecto, Proyecto proyecto) {
        try {
                Fase fase = new Fase();
                fase.setTimesheetCodigoFase(tsProyecto.getCodigoFase());
                fase.setNombre(tsProyecto.getFase());
                fase.setDescripcion(tsProyecto.getDescripcionFase());
                fase.setProyecto(proyecto);
                return faseDao.save(fase);     
        } catch (Exception e) {
            System.out.println("Error en DatosTsService > updateFase " + e);
            return new Fase();
        }
    }

    public Proyecto updateProyecto(TSProyectoDto tsProyecto, Cliente cliente) {
        Proyecto proyecto = new Proyecto();
        proyecto.setTimesheetClaveProyecto(tsProyecto.getCodigo());
        proyecto.setNombre(tsProyecto.getDescripcion());
        proyecto.setDescripcion(tsProyecto.getFase());
        proyecto.setEstado(EstadoProyecto.ACTIVO);
        proyecto.setTimesheetCodigoInterno(tsProyecto.getAbreviatura());
        proyecto.setCliente(cliente);
        if (tsProyecto.getDescripcionFase() == null ? ("Licencias") == null : tsProyecto.getDescripcionFase().equals("Licencias")) {
            proyecto.setTipoProyecto(TipoProyectoEnum.LICENCIA);
        } else {
            proyecto.setTipoProyecto(TipoProyectoEnum.PRODUCTIVA);
        }
        return proyectoDao.save(proyecto);

    }
}
