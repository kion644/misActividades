package com.cda.np.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cda.np.dto.InfoDto;
import com.cda.np.dto.RequestUsuarioJsonDto;
import com.cda.np.dto.UsuarioDto;
import com.cda.np.dto.UsuarioJsonDto;
import com.cda.np.enumm.CodigosEstadoEnum;
import com.cda.np.service.UsuarioService;

@RestController
public class UsuarioController {

	@Autowired
	UsuarioService usuarioService;
	
	
	@GetMapping("getUser/{legajo}")
	public UsuarioDto getUser(@PathVariable String legajo) {

		return usuarioService.getUsuarioByUsername(legajo);
	}
	
	@PostMapping("getUsuario")
	public ResponseEntity<UsuarioJsonDto> getUsuario(@RequestBody RequestUsuarioJsonDto json) {
		UsuarioJsonDto usuarioJson = new UsuarioJsonDto();
		InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
		try {
			usuarioJson.setHeader(json.getHeader());
			usuarioJson.setData(usuarioService.getUsuarioByUsername(json.getData().getLegajo()));
			usuarioJson.setInfo(responseInfo);

		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().body(usuarioJson);
	}

}
