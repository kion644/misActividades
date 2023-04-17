package com.ca.control.dao;

import com.ca.control.model.Feriado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FeriadoDao extends JpaRepository<Feriado, Integer> {

    @Query(value = "SELECT * FROM feriado WHERE fecha = :hoy " , nativeQuery = true)
    Feriado verificarFeriado (@Param(value="hoy") Date hoy);

    @Query(value = "SELECT * FROM feriado", nativeQuery = true)
    List<Feriado> getAllFeriados();

    boolean existsByFecha(@Param(value = "fecha") Date fecha);

    Feriado getAllByFecha(@Param(value = "fecha") Date fecha);
}
