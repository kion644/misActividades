package com.ca.control.service;

import com.ca.control.dao.FaseDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dto.CrearFaseDto;
import com.ca.control.model.Fase;
import com.ca.control.model.Proyecto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FaseService {

    @Autowired
    FaseDao faseDao;
    @Autowired ProyectoDao proyectoDao;

    public boolean createFase(CrearFaseDto CrearFaseDto) throws Exception {
        try {
            if (faseDao.existsFaseByNombre(CrearFaseDto.getNombre())) {
                throw new Exception("Ya existe una fase con este nombre");
            } else {
                Fase faseNuevo = new Fase();
                Proyecto pp = proyectoDao.getById(CrearFaseDto.getProyectoId());
                faseNuevo.setProyecto(pp);
                faseNuevo.setNombre(CrearFaseDto.getNombre());
                faseNuevo.setDescripcion(CrearFaseDto.getDescripcion());
                
                faseDao.save(faseNuevo);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean editFase(Fase fase) throws Exception {
        try {
            Fase faseAEditar = faseDao.findById(Long.valueOf(fase.getId())).orElseThrow(
                    () -> new Exception("Error al editar fase: La fase con el id ingresado no se ha encontrado")); {
                faseAEditar.setNombre(
                        fase.getNombre() != null ? fase.getNombre() : faseAEditar.getNombre());
                faseAEditar.setDescripcion(
                        fase.getDescripcion() != null ? fase.getDescripcion() : faseAEditar.getDescripcion());
                faseDao.save(faseAEditar);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteFase(Integer id) throws Exception {
        try {
            Fase faseABorrar = faseDao.findById(Long.valueOf(id)).orElseThrow(
                    () -> new Exception("Error al borrar fase: No se encontró ninguna fase con este Id"));
            faseDao.deleteById(Long.valueOf(faseABorrar.getId()));
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public Fase findById(Integer id) throws Exception {
        try {

            return faseDao.findById(Long.valueOf(id)).orElseThrow(
                    () -> new Exception("Error al encontrar fase: No se encontró ninguna fase con este id"));

        } catch (Exception e) {
            throw e;
        }

    }

    public List<Fase> findAll() throws Exception {
        try {
            List<Fase> lst = faseDao.getAllFases();
            return lst;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Fase> findAllByProyectoId(Long proyectoId) throws Exception {
        try {
            List<Fase> lst = faseDao.findAllByProyectoId(proyectoId);
            return lst;
        } catch (Exception e) {
            throw e;
        }
    }
  
}
