package com.cda.ts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cda.ts.model.PersonasDisponibilidades;
import com.cda.ts.repository.DisponibilidadDao;

@Service
public class DisponibilidadService {
	@Autowired
	DisponibilidadDao disponibilidadDao;
	
	public PersonasDisponibilidades getDisponibilidad(String usuario) {
		return disponibilidadDao.findByUsuario(usuario);
	}
	
}
