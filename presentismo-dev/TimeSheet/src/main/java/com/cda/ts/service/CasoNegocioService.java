package com.cda.ts.service;

import com.cda.ts.model.CasoNegocio;
import com.cda.ts.model.PersonasDisponibilidades;
import com.cda.ts.repository.CasoNegocioDao;
import com.cda.ts.repository.DisponibilidadDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CasoNegocioService {
	@Autowired
	CasoNegocioDao casoNegocioDao;
	
	public List<CasoNegocio> getAllCNs() {
		return casoNegocioDao.findAll();
	}
	
}
