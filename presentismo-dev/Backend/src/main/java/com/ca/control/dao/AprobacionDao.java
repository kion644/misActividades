package com.ca.control.dao;

import com.ca.control.model.Aprobacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AprobacionDao extends JpaRepository<Aprobacion, Long> {
    @Query(value = "select a.* " +
            "from aprobacion a " +
            "inner join usuario_licencia u " +
            "on u.id= a.usuario_licencia_id " +
            "where " +
            "u.estado_Licencia ='PENDIENTE_APROBACION_LIDER' " +
            "AND u.id = :usuarioLicenciaId " +
            "AND u.id_usuario IN " +
            "(select " +
            "dd.id_usuario_destinatario " +
            "from delegacion d " +
            "inner join delegacion_destinatarios dd " +
            "on d.id = dd.id_delegacion " +
            "where d.id_delegado=:id_usuario" +
            ")"
            , nativeQuery = true)
    Aprobacion findAprobacionByDelegacion(@Param(value="id_usuario") Long id, @Param(value="usuarioLicenciaId") Long usuarioLicenciaId);
}
