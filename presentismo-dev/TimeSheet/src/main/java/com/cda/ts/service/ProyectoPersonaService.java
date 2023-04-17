package com.cda.ts.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cda.ts.dto.PPDto;
import com.cda.ts.model.FaseProyecto;
import com.cda.ts.model.ProyectoPersona;
import com.cda.ts.repository.ProyectoDao;
import com.cda.ts.repository.ProyectoPersonaDao;

@Service
public class ProyectoPersonaService {
	@Autowired
	ProyectoPersonaDao proyectoPersonaDao;
	@Autowired
	ProyectoDao proyectoDao;

	public List<PPDto> getProyectoPersona(String nombre) {

		List<PPDto> ppdtoList = new ArrayList<PPDto>();
		
		List<Object[]> proyectos = proyectoPersonaDao.getProyectosByUsuario(nombre);

		for (Object[] objects : proyectos) {
			PPDto proyectoDto = chargeProyectoPersona(objects);

			ppdtoList.add(proyectoDto);
		}

		return ppdtoList;

	}

	private PPDto chargeProyectoPersona(Object[] objects) {
		
		PPDto ppdto = new PPDto();
		ppdto.setCodigo(objects[0].toString());
		ppdto.setDescripcion(objects[2].toString());
		ppdto.setUsuario(objects[3].toString());
		ppdto.setHorasTotales(objects[4].toString());
		ppdto.setLiderProyecto(objects[5].toString());
		ppdto.setAbreviatura(objects[6].toString());
		ppdto.setCliente( proyectoPersonaDao.getCliente(objects[7].toString()) );
		
		
		List<Object[]> fase = proyectoPersonaDao.getFaseByProyecto(ppdto.getCodigo(), objects[1].toString());
		
		for (Object[] object : fase) {
		ppdto.setCodigoFase(object[0].toString());
		ppdto.setFase(object[1].toString());
		ppdto.setDescripcionFase(object[2].toString());
		}
		

		return ppdto;
	}

}
