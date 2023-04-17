package com.cda.ts.repository;

import com.cda.ts.model.CasoNegocio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CasoNegocioDao extends JpaRepository<CasoNegocio, Long> {

	List<CasoNegocio> findAll();
}
