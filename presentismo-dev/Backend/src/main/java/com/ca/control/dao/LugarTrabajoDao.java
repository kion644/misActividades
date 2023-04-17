
package com.ca.control.dao;

import com.ca.control.model.LugarTrabajo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LugarTrabajoDao extends CrudRepository<LugarTrabajo, Long>{
    
    public LugarTrabajo findAllById(Long id);
    public boolean existsById(Long id);
}
