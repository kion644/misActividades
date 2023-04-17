
package com.ca.control.dao;

import com.ca.control.model.Fase;
import com.ca.control.model.Proyecto;
import com.ca.control.model.ProyectoFasePersona;
import com.ca.control.model.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoPersonaDao extends CrudRepository<ProyectoFasePersona, Long> {

	public ProyectoFasePersona findAllById(Long id);

	@Query(value = "SELECT pp.* FROM proyecto_persona pp inner join proyecto p on pp.proyecto_id = p.id where pp.user_persona=:usuario AND 	pp.habilitado = 1 AND p.estado = 'ACTIVO'\r\n"
			+ "order by p.tipo_proyecto DESC", nativeQuery = true)
	List<ProyectoFasePersona> findByUserPersona(@Param(value = "usuario") Usuario user);

	public Boolean existsProyectoPersonaByUserPersonaAndProyectoAndFase(Usuario user, Proyecto proyecto, Fase fase);

	@Query(value = " SELECT * FROM proyecto_persona pp " +
			" INNER JOIN proyecto p ON pp.proyecto_id = p.id " +
			" WHERE pp.user_persona=:usuario " +
			" AND p.tipo_proyecto = :tipo AND p.estado = 'ACTIVO'", nativeQuery = true)
	List<ProyectoFasePersona> findByUsuarioAndTipoProyecto(@Param(value = "usuario") Usuario usuario,
			@Param(value = "tipo") String tipoProyectoEnum);

	@Query(value = "SELECT pp.habilitado FROM proyecto_persona pp inner join proyecto p on pp.proyecto_id = p.id where pp.user_persona= :usuario AND pp.proyecto_id = :proyectoNuestro AND pp.fase_id = :fase \r\n"
			+ "order by p.timesheet_clave_proyecto ", nativeQuery = true)
	public boolean isProyectoPersonaEnabled(Usuario usuario, Proyecto proyectoNuestro, Fase fase);

	

}
