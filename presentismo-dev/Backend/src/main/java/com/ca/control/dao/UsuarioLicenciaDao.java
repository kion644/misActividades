package com.ca.control.dao;

import com.ca.control.enums.EstadoLicencia;
import com.ca.control.model.Proyecto;
import com.ca.control.model.Rol;
import com.ca.control.model.Usuario;
import com.ca.control.model.UsuarioLicencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioLicenciaDao extends JpaRepository<UsuarioLicencia, Long> {

        Optional<List<UsuarioLicencia>> findAllByUsuario(Usuario usuario);

        Optional<List<UsuarioLicencia>> findAllByUsuarioAndEstadoLicencia(Usuario usuario, EstadoLicencia estadoLicencia);

        @Query(value = "select * from misactividades.usuario_licencia join misactividades.licencia_aprobacion on usuario_licencia.id=licencia_aprobacion.id_licencia where id_usuario=?", nativeQuery = true)
        Optional<List<UsuarioLicencia>> obtenerPorId(@Param(value = "id_usuario") Long id_usuario);

        @Query("select u from UsuarioLicencia u inner join u.aprobaciones aprobaciones " +
                        "where u.estadoLicencia = ?1 and aprobaciones.aprobador = ?2")
        List<UsuarioLicencia> findByEstadoLicenciaAndAprobaciones_Aprobador(EstadoLicencia estadoLicencia,
                        Usuario aprobador);

        @Query(value ="select u.* from usuario_licencia u inner join aprobacion a on u.id= a.usuario_licencia_id where u.estado_Licencia ='PENDIENTE_APROBACION_LIDER' AND (a.id_aprobador= :id || u.id_usuario IN (select dd.id_usuario_destinatario from delegacion d inner join delegacion_destinatarios dd on d.id = dd.id_delegacion where d.id_delegado= :id))", nativeQuery = true)
        List<UsuarioLicencia> findLicenciasDelegadas(@Param(value = "id") Long id);

        @Query(value ="select u.* from usuario_licencia u inner join aprobacion a on u.id= a.usuario_licencia_id where (a.id_aprobador= :id || u.id_usuario IN (select dd.id_usuario_destinatario from delegacion d inner join delegacion_destinatarios dd on d.id = dd.id_delegacion where d.id_delegado= :id))", nativeQuery = true)
        List<UsuarioLicencia> findLicenciasDelegadasAprobadas(@Param(value = "id") Long id);

        List<UsuarioLicencia> findByEstadoLicencia(EstadoLicencia estadoLicencia);

        Optional<List<UsuarioLicencia>> findAllByFechaDesdeBeforeAndFechaHastaAfterAndEstadoLicenciaAndAprobaciones_Aprobador(
                        Date fechaDesde, Date fechaHasta, EstadoLicencia estadoLicencia, Usuario aprobador);

        @Query("select u from UsuarioLicencia u inner join u.aprobaciones aprobaciones where aprobaciones.aprobador = ?1")
        List<UsuarioLicencia> findByAprobaciones_Aprobador(Usuario aprobador);

        @Query("select u from UsuarioLicencia u inner join u.aprobaciones aprobaciones where aprobaciones.aprobador.rol = ?1")
        List<UsuarioLicencia> findByAprobaciones_Aprobador_Rol(Rol rol);

        @Query(value = "SELECT * FROM usuario_licencia  WHERE estado_licencia = \"ACEPTADA\" AND NOW() BETWEEN fecha_desde AND fecha_hasta", nativeQuery = true)
        List<UsuarioLicencia> obtenerLicenciasNoProcesadas();

        List<UsuarioLicencia> findByProyectoFasePersonaProyecto(Proyecto proyecto);

}
