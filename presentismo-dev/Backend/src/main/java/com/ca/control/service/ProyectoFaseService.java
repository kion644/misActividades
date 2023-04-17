package com.ca.control.service;

import com.ca.control.dao.FaseDao;
import com.ca.control.dao.ProyectoFasePersonaDao;
import com.ca.control.dao.ProyectoPersonaDao;
import com.ca.control.dto.JsonUserDto;
import com.ca.control.dto.ProyectoFaseDto;
import com.ca.control.enums.CodigosEstadoEnum;
import com.ca.control.model.Fase;
import com.ca.control.model.ProyectoFasePersona;
import com.ca.control.model.Usuario;
import com.ca.control.utils.Validate;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProyectoFaseService {

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	FaseDao faseDao;

	@Autowired
	ProyectoFasePersonaDao pfpDao;
	@Autowired
	ProyectoPersonaDao ppDao;
	private static final Logger logger = LoggerFactory.getLogger(ProyectoFaseService.class);

	public List<ProyectoFaseDto> getProyectoFase(JsonUserDto json) {

		Validate v = new Validate();
		v.setCode(CodigosEstadoEnum.OK);
		v.setSuccess(Boolean.TRUE);
		v.setMessage("OK");

		try {
			Usuario usuario = usuarioService.findByUsername(json.getData().getUser());
			List<ProyectoFasePersona> pp = ppDao.findByUserPersona(usuario);

			List<ProyectoFaseDto> lpfDto = new ArrayList<ProyectoFaseDto>();
			for (ProyectoFasePersona proyectopersona : pp) {
				Fase fase = faseDao.findById(proyectopersona.getFase().getId()).get();
				ProyectoFaseDto pfDto = new ProyectoFaseDto();
				pfDto.setId(fase.getId());
				pfDto.setNombre(
						fase.getProyecto().getCliente().getNombre()
								+ " / " +
						(fase.getProyecto().getTimesheetCodigoInterno() != null ? fase.getProyecto().getTimesheetCodigoInterno() : fase.getProyecto().getNombre())
								+ " / " +
						fase.getNombre());
				//pfDto.setNombre(fase.getProyecto().getCliente().getNombre()+ " / " + fase.getProyecto().getTimesheetCodigoInterno()+ " / " + fase.getNombre());
				lpfDto.add(pfDto);
			}
			return lpfDto;

		} catch (Exception e) {
			System.out.println("Error en ProyectoFaseService > getProyectoFase " + e);
			return null;
		}

	}

}