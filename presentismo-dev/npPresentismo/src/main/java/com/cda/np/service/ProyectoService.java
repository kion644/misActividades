package com.cda.np.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cda.np.model.Proyecto;
import com.cda.np.repository.ProyectoDao;

@Service
public class ProyectoService {
	@Autowired
	ProyectoDao proyectoDao;

	public List<Proyecto> getProyectos(String ternroUsuario) {
		return proyectoDao.find(ternroUsuario, "5");
	}

}
