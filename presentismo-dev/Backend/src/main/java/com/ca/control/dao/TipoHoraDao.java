
package com.ca.control.dao;

import com.ca.control.enums.TipoEstadoEnum;
import com.ca.control.model.TipoHora;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoHoraDao extends CrudRepository<TipoHora, Long>{
    TipoHora findAllById(Long id);

    public List<TipoHora> findAllByTipo(TipoEstadoEnum TipoEstadoEnum);
    public TipoHora findAllByNombre(String nombre);
   
}
