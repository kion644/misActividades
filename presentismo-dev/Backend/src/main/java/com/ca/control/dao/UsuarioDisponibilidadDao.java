package com.ca.control.dao;

import com.ca.control.model.UsuarioDisponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioDisponibilidadDao extends JpaRepository<UsuarioDisponibilidad, Long> {

	@Query(value = "select * from usuario_disponibilidad where id_usuario = ? order by fecha_creacion DESC LIMIT 1", nativeQuery = true)
	public UsuarioDisponibilidad findUsuarioDispByUsuarioId(@Param(value = "id_usuario") Long id_usuario);

	@Query(value = "SELECT * FROM usuario_disponibilidad", nativeQuery = true)
	List<UsuarioDisponibilidad> getAllUsuarioDisponibilidad();

	@Query(value = "SELECT T1.* FROM usuario_disponibilidad T1 INNER JOIN (SELECT id_usuario, MAX(fecha_creacion) Max_Fecha FROM usuario_disponibilidad T GROUP BY id_usuario) T2 on T1.id_usuario = T2.id_usuario and T1.fecha_creacion = T2.Max_Fecha ORDER BY fecha_creacion DESC", nativeQuery = true)
	List<UsuarioDisponibilidad> getAllLastUsuarioDisponibilidad();


	@Query(value = "SELECT * from usuario_disponibilidad where id_usuario = ? order by fecha_creacion DESC LIMIT 1", nativeQuery = true)
	public UsuarioDisponibilidad findHsDiariasByUsuarioId(@Param(value = "id_usuario") Long id_usuario);

	boolean existsByUsuarioId(@Param(value = "id_usuario") Long id_usuario);
}
