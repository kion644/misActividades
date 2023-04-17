package com.ca.control.dao;

import java.util.Date;
import java.util.List;

import com.ca.control.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ca.control.model.Delegacion;

@Repository
public interface DelegacionDao  extends JpaRepository<Delegacion, Long> {


    @Query(value = "SELECT * FROM Delegacion where id_creador =:id", nativeQuery = true)
    List<Delegacion> getAllUsuarioCreador(@Param(value = "id") Long id);

    @Query(value = "SELECT * FROM Delegacion where id_delegado= :id AND accion= :accion", nativeQuery = true)
    Delegacion existeDelegadoAndAccion(@Param(value = "id") Long id, @Param(value = "accion") String accion);

    public Delegacion findAllById(Long id);
}