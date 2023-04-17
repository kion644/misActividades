package com.cda.ts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cda.ts.model.PersonasDisponibilidades;
import com.cda.ts.service.DisponibilidadService;

@RestController
public class DisponibilidadController {
	@Autowired
	DisponibilidadService disponibilidadService;

	@GetMapping("getDisponibilidad/{usuario}")
	public PersonasDisponibilidades test(@PathVariable String usuario) {
		return disponibilidadService.getDisponibilidad(usuario);
	}

}
