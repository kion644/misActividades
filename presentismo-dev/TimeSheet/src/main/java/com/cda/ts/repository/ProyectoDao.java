package com.cda.ts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cda.ts.model.Proyecto;

public interface ProyectoDao extends JpaRepository<Proyecto, Long> {

	List<Proyecto> findAll();
}
