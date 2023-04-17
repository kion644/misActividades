package com.ca.control.dao;

import com.ca.control.model.Archivo;
import com.ca.control.model.UsuarioLicencia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchivoDao extends CrudRepository<Archivo, Long> {

	Archivo findAllById(Long id);

	Archivo findByUsuarioLicencia(long id);

	@Query(value = "SELECT * FROM archivo where  id_usuario_licencia = :id", nativeQuery = true)
	Archivo BuscaIdLicencia(@Param(value = "id") Long id);

	boolean existsByUsuarioLicencia(UsuarioLicencia usuarioLicencia);

}
