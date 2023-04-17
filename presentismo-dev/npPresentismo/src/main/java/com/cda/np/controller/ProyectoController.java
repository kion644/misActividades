package com.cda.np.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cda.np.dto.InfoDto;
import com.cda.np.dto.ProyectoJsonDto;
import com.cda.np.dto.RequestProyectJsonDto;
import com.cda.np.enumm.CodigosEstadoEnum;
import com.cda.np.model.Proyecto;
import com.cda.np.service.ProyectoService;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class ProyectoController {

	@Autowired
	ProyectoService proyectoService;
	
	
	@GetMapping("proyectosUsuario/{ternroUsuario}")
	public List<Proyecto> getProyecto(@PathVariable String ternroUsuario) {
		return proyectoService.getProyectos(ternroUsuario);
	}
	
	@PostMapping("getProyectos")
	public ResponseEntity<ProyectoJsonDto> getProyecto(@RequestBody RequestProyectJsonDto json) {
		ProyectoJsonDto proyectoJson = new ProyectoJsonDto();
		InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
		try {
			proyectoJson.setHeader(json.getHeader());
			proyectoJson.setData(proyectoService.getProyectos(json.getData().getTernro()));
			proyectoJson.setInfo(responseInfo);

		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().body(proyectoJson);
	}

}
