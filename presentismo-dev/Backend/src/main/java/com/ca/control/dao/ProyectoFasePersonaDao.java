package com.ca.control.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ca.control.dto.AgregarPersonaAFaseDto;
import com.ca.control.model.ProyectoFasePersona;

@Repository 
public interface ProyectoFasePersonaDao extends CrudRepository<ProyectoFasePersona,Long> {
    
    
    @Query(value = " SELECT * FROM proyecto_persona WHERE fase_id = :id  " , nativeQuery = true)
	List<ProyectoFasePersona> getAllByFaseId(@Param(value = "id") Long id);

    void save(AgregarPersonaAFaseDto personaNueva);
    
}
