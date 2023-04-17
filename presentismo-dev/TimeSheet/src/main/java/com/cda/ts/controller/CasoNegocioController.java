package com.cda.ts.controller;

import com.cda.ts.dto.PPDto;
import com.cda.ts.model.CasoNegocio;
import com.cda.ts.service.CasoNegocioService;
import com.cda.ts.service.ProyectoPersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CasoNegocioController {
	@Autowired
	CasoNegocioService casoNegocioService;

	@GetMapping("casosNegocio/findAll")
	public List<CasoNegocio> proyectoByUsuario() {

		return casoNegocioService.getAllCNs();
	}
}
