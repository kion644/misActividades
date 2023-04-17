package com.cda.np.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cda.np.model.Proyecto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProyectoDao extends JpaRepository<Proyecto, Long> {
	
	// select * from his_estructura where where ternro = '3453' and tenro = '5' and htethasta is null ;
	@Query(value = "SELECT * FROM his_estructura  WHERE ternro=:id1 AND tenro=:id2 AND htethasta is null  ", nativeQuery = true)
	public List<Proyecto> find(@Param(value = "id1") String ternro, @Param(value = "id2") String tenro);

}
