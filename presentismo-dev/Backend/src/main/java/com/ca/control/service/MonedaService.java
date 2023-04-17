package com.ca.control.service;
import com.ca.control.dao.CasoNegocioDao;
import com.ca.control.dao.MonedaDao;
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Moneda;
import com.ca.control.model.Proyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class MonedaService {
    @Autowired
    MonedaDao monedaDao;

    @Autowired
    CasoNegocioDao casoNegocioDao;

    @Autowired
    ProyectoService proyectoService;
    @Autowired
    CasoNegocioService casoNegocioService;


    public List<Moneda> findAll() throws Exception {
        try {
            return monedaDao.findAll();
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Moneda> findAllByDescripcion(String descripcion) {
        try {
            return monedaDao.findAllByDescripcion(descripcion);
        } catch (Exception e) {
            throw e;
        }
    }

    public Moneda findById(Integer id) throws Exception {
        try {
            return monedaDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado el caso de negocio con id: " + id));
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean newMoneda(String descripcion, String abreviatura) throws Exception {
        try {
            if (!monedaDao.findAllByDescripcion(descripcion).isEmpty()) {
                throw new Exception("Ya existe una moneda con esa descripcion");
            }
            Moneda nuevo = new Moneda();
            nuevo.setDescripcion(descripcion);
            nuevo.setAbreviatura(abreviatura);
            monedaDao.save(nuevo);
            monedaDao.flush();
            return true;
        } catch (Exception e) {
            throw e;
        }
    }
    public Boolean editMonedaById(Integer id, String nuevaDescripcion, String nuevaAbreviatura) throws Exception {
        try {
            Moneda monedaAEditar = monedaDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado la moneda con id " + id));
            if(!casoNegocioService.findCasoNegocioByMoneda(monedaAEditar).isEmpty()){
                throw new Exception("La moneda está en uso. No puede ser modificado");
            }
            monedaAEditar.setDescripcion(nuevaDescripcion);
            monedaAEditar.setAbreviatura(nuevaAbreviatura);
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean deleteMonedaById(Integer id) throws Exception{
        try {//TODO Contemplar que la moneda no este asignada a nin CN para poder ser borrada

            Moneda monedaABorrar = monedaDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado la moneda con id " + id));
            if(!casoNegocioService.findCasoNegocioByMoneda(monedaABorrar).isEmpty())
            
            {
                throw new Exception("La moneda está en uso. No puede ser eliminada");
            }
            monedaDao.delete(monedaABorrar);
            return true;
        }catch (Exception e){
            throw e;
        }
    }

    public Boolean asociarMonedaACN(Integer idMoneda, Integer idCN) throws Exception {
        try{
            Moneda moneda = monedaDao.findById(idMoneda).orElseThrow(() -> new Exception("No se ha encontrado la moneda con el id " + idMoneda));
            CasoNegocio casoNegocio = casoNegocioService.findById(idCN);
            casoNegocio.setMoneda(moneda);
            return true;
        }catch (Exception e){
            throw e;
        }
    }
}
