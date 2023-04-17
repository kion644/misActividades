package com.ca.control.dao;
import com.ca.control.model.Moneda;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonedaDao extends JpaRepository<Moneda, Integer> {

    List<Moneda> findAllByDescripcion(String descripcion);
}
