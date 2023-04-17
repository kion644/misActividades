package com.ca.control.dao;

import com.ca.control.model.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Long> {

	 Usuario findAllById(Long id);

	@Query(value = "SELECT * FROM usuario_cache WHERE id_rol_usuario = 3 ORDER BY usuario ASC", nativeQuery = true)
	List<Usuario> findAllLideres();

	 Usuario findByUsername(String usuario);

	 Usuario findByUsernameIgnoreCase(String username);

	 Usuario findAllByUsernameIgnoreCase(String username);

	 Usuario findByNombre(String nombre);

	 Usuario findById(Integer id);

	 Usuario findByLegajo(String legajo);

	 Usuario findByEmail(String email);

	 boolean existsByUsernameIgnoreCase(String username);

	 boolean existsByemail(String email);


	 boolean existsByLegajo(String legajo);

	@Query(value = "SELECT * FROM usuario_cache u WHERE id_lider=:id", nativeQuery = true)
	 List<Usuario> findDistinctUsuarioByLider(@Param(value = "id") Long id);

	@Query(value = "SELECT EXISTS(SELECT * FROM usuario_cache u WHERE id_lider=:id)", nativeQuery = true)
	 Integer existsByIdLider(Long id);

       @Query(value = "SELECT EXISTS(SELECT * FROM usuario_cache u WHERE id_lider=:id)", nativeQuery = true)
	 boolean existsElIdLider(Long id);

       @Query(value = "SELECT * FROM usuario_cache u WHERE id_lider=:id", nativeQuery = true)
	   Usuario findByIdLider(Long id);

	@Query(value = "SELECT U.* FROM usuario_cache U INNER JOIN delegacion_destinatarios DD ON U.id = DD.id_usuario_destinatario WHERE U.id_lider=19 AND U.id !=19 AND DD.id_delegacion = :id ORDER BY U.apellido", nativeQuery = true)
	List<Usuario> listaUsuariosDestinatarios(@Param(value = "id") Long id);

	@Query(value = "SELECT * FROM usuario_cache U WHERE U.id_lider=19 AND U.id !=19 AND U.id NOT IN (SELECT DD.id_usuario_destinatario FROM delegacion_destinatarios DD WHERE DD.id_delegacion = :id) ORDER BY U.apellido", nativeQuery = true)
	List<Usuario> listaUsuariosNoDestinatarios(@Param(value = "id") Long id);

	@Query(value = "SELECT * FROM usuario_cache order by apellido asc", nativeQuery = true)
	List<Usuario> getAllUsuario();

	@Query(value = "SELECT id FROM usuario_cache u WHERE usuario=:username", nativeQuery = true)
	Long findIdByUsername(String username);

	Usuario getById(Long userId);

	@Query(value = "SELECT * FROM misactividades.usuario_cache  where apellido != \"no aplica\" order by apellido", nativeQuery = true)
	List<Usuario> findAllUsuarios(String username);

}
