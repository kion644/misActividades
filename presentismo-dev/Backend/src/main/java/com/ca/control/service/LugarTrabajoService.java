package com.ca.control.service;


import com.ca.control.dao.LugarTrabajoDao;
import com.ca.control.dto.JsonDto;
import com.ca.control.dto.JsonListDto;
import com.ca.control.enums.CodigosEstadoEnum;
import com.ca.control.model.LugarTrabajo;
import com.ca.control.utils.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LugarTrabajoService {

	@Autowired
	LugarTrabajoDao lugarTrabajoDao;

	public ResponseEntity<JsonListDto> listaLugarTrabajo(JsonDto json) {
		ResponseEntity<JsonListDto> registrosFront = new ResponseEntity<JsonListDto>(HttpStatus.ACCEPTED);

		try {
			registrosFront= this.seteoLugarTrabjo(json);
			return registrosFront;
		} catch (Exception e) {
			registrosFront = seteoLugarTrabjo(json);
			System.out.println("Error en LugarTrabajoService > listaLugarTrabajo " + e);
			return registrosFront;
		}

	}
	
	//-------------------------------- FUNCIONES ------------------------------------------------

	private ResponseEntity<JsonListDto> seteoLugarTrabjo(JsonDto json)  {
		ResponseEntity<JsonListDto> registrosFront = new ResponseEntity<JsonListDto>(HttpStatus.ACCEPTED);

	

		Validate validate =new Validate();
			List<LugarTrabajo> registros = (List<LugarTrabajo>) lugarTrabajoDao.findAll();

			if (registros.isEmpty()) {
				validate.setError(CodigosEstadoEnum.ERROR_REGISTRO_NO_ENCONTRADO,false);
	
			} else {
				validate.setError(CodigosEstadoEnum.OK,true);
			}
			registrosFront =new JsonListDto(json).jsonListResponde((List) registros,validate);
			return registrosFront;
		
	}

}
