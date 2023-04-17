package com.ca.control.service;

import com.ca.control.dao.TipoHoraDao;
import com.ca.control.dto.JsonDto;
import com.ca.control.dto.JsonListDto;
import com.ca.control.enums.CodigosEstadoEnum;
import com.ca.control.utils.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TipoHoraService {

	@Autowired
	TipoHoraDao tipoHoraDao;



	public ResponseEntity<JsonListDto> listarTipoHoras(JsonDto json) {
		ResponseEntity<JsonListDto> registros = new ResponseEntity<JsonListDto>(HttpStatus.ACCEPTED);
			 registros= setListaTipoHora(json);
			return registros;

	}
	
	private ResponseEntity<JsonListDto> setListaTipoHora(JsonDto json){
		Validate validate = new Validate();
		try {
			return new JsonListDto(json).jsonListResponde((List) tipoHoraDao.findAll(),validate.setError(CodigosEstadoEnum.OK, true));
		} catch (Exception e) {
			System.out.println("Error en TipoHoraService > setListaTipoHora " + e);
			return new JsonListDto(json).jsonListResponde((List) tipoHoraDao.findAll(),validate.setError(CodigosEstadoEnum.ERROR_SERVIDOR_NO_RESPONDE, false));
		}
		
		
	}

}
