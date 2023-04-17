package com.ca.control.dao;

import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Moneda;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CasoNegocioDao extends JpaRepository<CasoNegocio, Integer> {

    List<CasoNegocio> findAllByNombre(String nombre);
    List<CasoNegocio> findAllByMoneda(Moneda moneda);
    @Query(value = "SELECT * FROM caso_negocio", nativeQuery = true)
    List<CasoNegocio> getAllCasoNegocio();
}
