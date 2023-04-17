package com.cda.ts.controller;

import com.cda.ts.dto.PPDto;
import com.cda.ts.model.ProyectoPersona;
import com.cda.ts.service.ProyectoPersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProyectoPersonaController {
	@Autowired
	ProyectoPersonaService pps;

	@GetMapping("proyectoByUsuario/{usuario}")
	public List<PPDto> proyectoByUsuario(@PathVariable String usuario) {

		return pps.getProyectoPersona(usuario);
	}
}
