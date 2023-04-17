package com.ca.control.service;

import com.ca.control.dao.CasoNegocioDao;
import com.ca.control.dto.TsCasoNegocioDto;
import com.ca.control.dto.AltaCasoNegocioDto;
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Moneda;
import com.ca.control.model.Pais;
import com.ca.control.model.Proyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class CasoNegocioService {

    @Autowired
    CasoNegocioDao casoNegocioDao;

    @Autowired
    ProyectoService proyectoService;

    @Autowired
    MonedaService monedaService;
    @Autowired
    ConexionTsService conexionTsService;


    public List<AltaCasoNegocioDto> findAll() throws Exception {
        try {
            List<CasoNegocio> lst = casoNegocioDao.getAllCasoNegocio();
            return getAltaCasoNegocioDto(lst);
        } catch (Exception e) {
            throw e;
        }
    }

    public TsCasoNegocioDto[] findAllCNTimeSheet(){
        try {
            return conexionTsService.getCNs();
        }catch (Exception e){
            throw e;
        }
    }

    public boolean importarCNDesdeTS(){
        try {
            TsCasoNegocioDto[] casoNegocios = findAllCNTimeSheet();
            for (TsCasoNegocioDto casoNegocioDto:
                 casoNegocios) {
                CasoNegocio nuevoCaso = new CasoNegocio();
                nuevoCaso.setNombre(casoNegocioDto.getNombre());
                nuevoCaso.setCodigoTimesheet(Integer.valueOf(casoNegocioDto.getCodigo()));
                casoNegocioDao.save(nuevoCaso);
            }
            return true;
        }catch (Exception e){
            throw e;
        }
    }

    public List<CasoNegocio> findAllByNombre(String nombre) {
        try {
            return casoNegocioDao.findAllByNombre(nombre);
        } catch (Exception e) {
            throw e;
        }
    }

    public CasoNegocio findById(Integer id) throws Exception {
        try {
            return casoNegocioDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado el caso de negocio con id: " + id));
        } catch (Exception e) {
            throw e;
        }
    }

    public List<CasoNegocio> findCasoNegocioByMoneda(Moneda moneda){
        try {
            return casoNegocioDao.findAllByMoneda(moneda);
        }catch (Exception e){
            throw e;
        }
    }

    public Boolean newCasoNegocio(AltaCasoNegocioDto json) throws Exception {
        try {
            if (!casoNegocioDao.findAllByNombre(json.getNombre()).isEmpty()) {
                throw new Exception("Ya existe un caso de negocio con dicho nombre");
            }
            CasoNegocio nuevo = new CasoNegocio();
            nuevo.setNombre(json.getNombre());
            nuevo.setMoneda(monedaService.findById(json.getIdMoneda()));
            casoNegocioDao.save(nuevo);
            casoNegocioDao.flush();
            return true;
        } catch (Exception e) {
            throw e;
        }
    }
    public Boolean editCasoNegocioById(Integer id, String nuevoNombre, Integer idMoneda) throws Exception {
        try {
            CasoNegocio casoAEditar = casoNegocioDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado el caso de negocio con id " + id));
            if(!proyectoService.findProyectoByCasoNegocio(casoAEditar).isEmpty()){
                throw new Exception("El caso de negocio está en uso. No puede ser modificado");
            }
            casoAEditar.setNombre(nuevoNombre);
            casoAEditar.setMoneda(monedaService.findById(idMoneda));
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean deleteCasoNegocioById(Integer id) throws Exception{
        try {//TODO Contemplar que el caso de negocio no esté asignado a ningun proyecto para poder ser borrado

            CasoNegocio casoNegocioABorrar = casoNegocioDao.findById(id).orElseThrow(() -> new Exception("No se ha encontrado el caso de negocio con id " + id));
            if(!proyectoService.findProyectoByCasoNegocio(casoNegocioABorrar).isEmpty()){
                throw new Exception("El caso de negocio está en uso. No puede ser eliminado");
            }
            casoNegocioDao.delete(casoNegocioABorrar);
            return true;
        }catch (Exception e){
            throw e;
        }
    }

    public Boolean asociarCasoNegocioAProyecto(Integer idCasoNegocio, Long idProyecto) throws Exception {
        try{
            CasoNegocio casoNegocio = casoNegocioDao.findById(idCasoNegocio).orElseThrow(() -> new Exception("No se ha encontrado el caso de negocio con el id " + idCasoNegocio));
            Proyecto proyecto = proyectoService.findById(idProyecto);
            proyecto.setCasoNegocio(casoNegocio);
            return true;
        }catch (Exception e){
            throw e;
        }
    }

    public List<AltaCasoNegocioDto> getAltaCasoNegocioDto(List<CasoNegocio> lst){
        try {

            List<AltaCasoNegocioDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (casoNegocio) -> {
                        try{
                            AltaCasoNegocioDto dto = new AltaCasoNegocioDto(
                                    casoNegocio.getId(),
                                    casoNegocio.getNombre(),
                                    casoNegocio.getMoneda().getId());
                                    toReturn.add(dto);

                        }catch (Exception e){
                            System.out.println("El proyecto de id " + casoNegocio.getId() + " tiene un valor null");

                        }
                    }
            );
            return toReturn;

        }catch (Exception e) {
            System.out.println("Error en CasoNegocioService > getAltaCasoNegocioDto " + e);
            return null;
        }
    }

}
