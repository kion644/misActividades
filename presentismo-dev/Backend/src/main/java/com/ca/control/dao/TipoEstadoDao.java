package com.ca.control.dao;

import com.ca.control.model.TipoEstado;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEstadoDao extends CrudRepository<TipoEstado, Long>{
    
  public TipoEstado findAllById(Long id);  
}
