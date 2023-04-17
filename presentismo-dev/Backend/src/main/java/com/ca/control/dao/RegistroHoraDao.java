package com.ca.control.dao;

import com.ca.control.enums.EstadoRegistroHora;
import com.ca.control.enums.TipoProyectoEnum;
import com.ca.control.model.Fase;
import com.ca.control.model.Proyecto;
import com.ca.control.model.RegistroHora;
import com.ca.control.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.*;

@Repository
public interface RegistroHoraDao extends JpaRepository<RegistroHora, Long> {

	RegistroHora findAllById(Long id);

	RegistroHora findAllByUsuarioAndFinNullOrderByIdDesc(Usuario usuario);

	RegistroHora findByUsuarioAndInicioBetween(Usuario usuario, Date inicio, Date hasta);

	Optional<RegistroHora> findTopByUsuarioIdOrderByIdDesc(Long id);

	List<RegistroHora> findAllByEstadoRegistro(String tipoEstado);

	List<RegistroHora> findAllByLiderAndCambioInicioNotNull(Usuario lider);

	List<RegistroHora> findAllByLiderAndEstadoRegistro(Usuario lider, String tipoEstado);

	List<RegistroHora> findByUsuarioAndCambioInicioNotNull(Usuario Usuario);

	List<RegistroHora> findAllByUsuarioAndEstadoRegistro(Usuario usuario, String tipoEstado);

	List<RegistroHora> findAllByUsuarioAndInicioBetweenOrderByInicioAsc(Usuario usuario, Date d, Date h);
        
	boolean existsByUsuarioAndInicioBetween(Usuario usuario, Date d, Date h);

	List<RegistroHora> findAllByUsuarioAndInicioBetween(Usuario usuario,Date i,Date f);

	boolean existsByUsuarioAndFinNull(Usuario usuario);

	@Query(value = "SELECT * FROM registro_horas " + "WHERE inicio BETWEEN :inicio AND :fin AND id_usuario= :id "
			+ "order by inicio desc limit 1", nativeQuery = true)
	RegistroHora ultimoRegistroDia(@Param(value = "id") Long id, @Param(value = "inicio") Date inicio,
			@Param(value = "fin") Date fin);

	@Query(value = "SELECT TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW())))/60/60,0) as 'hours',\n"
			+ "	TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW())))/60,0) - (TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW())))/60/60,0)*60) as 'minutes'\n"
			+ " FROM registro_horas r inner join tipo_hora t on r.id_tipo_hora=t.id where\n"
			+ " inicio between :inicio and :fin and id_usuario = :id and t.tipo !=\"PAUSA\" ", nativeQuery = true)
	Map<String, String> horaMinutosTrabajados(@Param(value = "id") Long id,
			@Param(value = "inicio") String inicio, @Param(value = "fin") String fin);

	@Query(value = " SELECT DATE_FORMAT(h.inicio,'%Y-%m-%d') as 'date',u.usuario, \n"
			+ " TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW()))/60/60),0) as 'hours', \n"
			+ " TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW())))/60,0)-TRUNCATE(SUM(timestampdiff(SECOND,inicio,ifnull(fin,NOW())))/60/60,0)*60 as 'minutes', \n"
			+ " (SELECT CASE WHEN proyexto_text = \"[CDA] - CDA Informática / [NP] - Licencia Injustificada / General\" THEN 'true' WHEN proyexto_text = \"\" THEN 'true' WHEN proyexto_text IS NULL THEN 'true' WHEN fin IS NULL THEN 'true' ELSE 'false' END) as 'requiereAtencion' \n"
			+ " FROM registro_horas h inner join usuario_cache u on h.id_usuario=u.id inner join tipo_hora t on h.id_tipo_hora=t.id \n"
			+ " where h.id_usuario = :id and h.inicio between :inicio and :fin and (t.tipo !=\"PAUSA\") "
			+ " group by  DATE_FORMAT(h.inicio,'%Y-%m-%d') order by DATE_FORMAT(h.inicio,'%Y-%m-%d') desc "
			, nativeQuery = true)
	List<Map<?, ?>> horasMinutosTrabajadosXDia(@Param(value = "id") Long id,
			@Param(value = "inicio") String inicio, @Param(value = "fin") String fin);

	Long countByLiderAndEstadoRegistro(Usuario id_lider, String estadoRegistro);

	@Query(value = "SELECT rh.cambio_inicio, rh.caracteristica, rh.descripcion, rh.estado_registro, rh.estado_registro_hora, rh.fecha_procesado, rh.fin, ifnull(rh.id,-1) as id, rh.id_cliente, "	
			+ "rh.id_fase, rh.id_lider, rh.id_lugar_trabajo, rh.id_rol_usuario, rh.id_tipo_hora, u.id as id_usuario, rh.inicio, rh.justificacion, rh.proyexto_text "
			+ "FROM usuario_cache u LEFT JOIN registro_horas rh ON U.id=rh.id_usuario AND rh.inicio between (now()-interval 1 day) and now()", nativeQuery = true)
	List<RegistroHora> traerRegistrosHorasDelDia();

	@Query(value = " SELECT sum(TIMESTAMPDIFF(MINUTE, inicio, fin))/60 AS horasReales "
	+ " FROM registro_horas "
	+ " WHERE id_usuario = ?1 "
	+ " AND id_fase = ?2 "
	+ " AND inicio BETWEEN ?3 AND ?4 "
	+ " GROUP BY id_fase, id_usuario " 
	, nativeQuery = true)
	HorasTrabajadasProjection findHorasTrabajadasByFaseAndUsuarioBetweenHorario(String idUsuario, String idFase, Date inicio, Date fin);

	@Query(value = " SELECT sum(TIMESTAMPDIFF(MINUTE, inicio, fin))/60 AS horasReales "
			+ " FROM registro_horas "
			+ " WHERE id_usuario = ?1 "
			+ " AND id_fase = ?2 "
			+ " AND inicio BETWEEN ?3 AND ?4 "
			+ " AND (estado_registro_hora = ?5 OR ( estado_registro_hora = 'PROCESADO' AND fecha_procesado between ?6 and ?7 ))"
			+ " GROUP BY id_fase, id_usuario "
			, nativeQuery = true)
	HorasTrabajadasProjection findHorasTrabajadasByFaseAndUsuarioBetweenHorarioAndEstadoRegistroHora(Usuario usuario, Fase fase, Timestamp inicio, Timestamp fin, String estadoRegistroHora, Timestamp ahoraInicio, Timestamp ahoraFin);

	@Query(value = "SELECT * "
	+ " FROM registro_horas "
	+ " WHERE estado_registro_hora = ?1 "
	+ " AND id_tipo_hora NOT LIKE 2 "
	+ " GROUP BY id_fase, id_usuario, date_format(inicio,'%y-%m-%d') "
	+ " ORDER BY id_usuario DESC "
	, nativeQuery = true)
    List<RegistroHora> findAllByEstadoRegistroHora(String estadoRegistroHora);

	@Query(value = "SELECT * "
			+ " FROM registro_horas "
			+ " WHERE estado_registro_hora = ?1 OR ( estado_registro_hora = 'PROCESADO' AND fecha_procesado between ?3 and ?4 ) "
			+ " AND id_tipo_hora NOT LIKE 2 "
			+ " AND inicio < ?2 "
			+ " GROUP BY id_fase, id_usuario, date_format(inicio,'%y-%m-%d') "
			+ " ORDER BY id_usuario DESC "
			, nativeQuery = true)
	List<RegistroHora> findAllByEstadoRegistroHoraAndinicioBefore(String estadoRegistroHora, Timestamp inicio, Timestamp procesadoDesde, Timestamp procesadoHasta);

	@Query(value = "SELECT * "
			+ " FROM registro_horas "
			+ " WHERE estado_registro_hora = ?1 OR ( estado_registro_hora = 'PROCESADO' AND fecha_procesado between ?3 and ?4 ) "
			+ " AND id_tipo_hora NOT LIKE 2 "
			+ " AND inicio < ?2 "
			+ " ORDER BY id_usuario DESC "
			, nativeQuery = true)
	List<RegistroHora> findAllByEstadoRegistroHoraAndinicioBeforeClean(String estadoRegistroHora, Timestamp inicio, Timestamp procesadoDesde, Timestamp procesadoHasta);

	@Query(value = "SELECT * "
	+ " FROM registro_horas "
	+ " WHERE estado_registro_hora =  ?1   "
	+ " AND id_tipo_hora NOT LIKE 2 "
	+ " AND fecha_procesado between ?2 AND ?3 "
	+ " GROUP BY id_fase, id_usuario, date_format(inicio,'%y-%m-%d') "
	+ " ORDER BY id_usuario DESC "
	, nativeQuery = true)
	List<RegistroHora> findAllByEstadoRegistroHoraAndFechaProcesadoBetween(String estadoRegistroHora, Timestamp inicio, Timestamp fin);

	@Query(value = " SELECT sum(TIMESTAMPDIFF(MINUTE, inicio, fin))/60 AS horasReales "
	+ " FROM registro_horas "
	+ " WHERE id_usuario = ?1 "
	+ " AND id_fase = ?2 "
	+ " AND estado_registro_hora = ?3 "
	+ " GROUP BY id_fase, id_usuario "
	, nativeQuery = true)
	HorasTrabajadasProjection findHorasTrabajadasByFaseAndUsuarioAndEstadoRegistroHora(String idUsuario, String idFase, String estadoRegistroHora);

	@Query(value = " SELECT sum(TIMESTAMPDIFF(MINUTE, inicio, fin))/60 AS horasReales "
	+ " FROM registro_horas "
	+ " WHERE id_usuario = ?1 "
	+ " AND id_fase = ?2 "
	+ " AND estado_registro_hora = ?3 "
	+ " AND fecha_procesado BETWEEN ?4 AND ?5 "
	+ " AND inicio BETWEEN ?6 AND ?7 "
	+ " GROUP BY id_fase, id_usuario "
	, nativeQuery = true)
	HorasTrabajadasProjection FindHorasTrabajadasByFaseAndUsuarioAndEstadoRegistroHoraAndFechaProcesadoBetweenAndInicioBetween(Usuario usuario, Fase fase, String estadoRegistroHora, Date inicioProcesado, Date finProcesado, Date inicioInicio, Date inicioFins);

	@Query(value = "SELECT DISTINCT(DATE(inicio))  FROM registro_horas WHERE (inicio >= :fecha_desde AND inicio <= CURDATE()) ORDER BY inicio ASC;", nativeQuery = true)
	ArrayList<String> rangoFechasDesdeHasta(@Param(value = "fecha_desde") Date fecha_desde);

	List<RegistroHora> findAllByUsuarioAndFase(Usuario usuario,Fase fase);

	boolean existsByUsuarioAndEstadoRegistroHoraAndInicioBetween(Usuario u, EstadoRegistroHora estadoRegistroHora, Date inicio, Date fin);

    List<RegistroHora> findByFinIsNullAndInicioBetween(Timestamp yesterday, Timestamp today);

	RegistroHora findByUsuarioAndFinIsNullAndInicioBetween(Usuario usuario, Timestamp desde, Timestamp hasta);

	List<RegistroHora> findByFaseProyectoTipoProyecto(TipoProyectoEnum tipoProyecto);

	List<RegistroHora> findByFaseProyecto(Proyecto proyecto);

	@Query(value = " select * from registro_horas where estado_registro= :estado and id_usuario in (select dd.id_usuario_destinatario from delegacion d inner join delegacion_destinatarios dd on d.id = dd.id_delegacion where d.id_delegado= :id_usuario) ", nativeQuery = true)
	List<RegistroHora> findByDelegados(@Param(value = "id_usuario")Long id_usuario, @Param(value = "estado")String estado);

	@Query(value = " select * from registro_horas where cambio_inicio is not null and id_usuario in (select dd.id_usuario_destinatario from delegacion d inner join delegacion_destinatarios dd on d.id = dd.id_delegacion where d.id_delegado= :id_usuario)", nativeQuery = true)
	List<RegistroHora> findDelegado(@Param(value = "id_usuario")Long id_usuario);
}
