package com.cda.np.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cda.np.dto.UsuarioDto;
import com.cda.np.model.Usuario;
import com.cda.np.repository.UsuarioDao;

@Service
public class UsuarioService {

	@Autowired
	UsuarioDao usuarioDao;

	public UsuarioDto getUsuarioByUsername(String legajo) {
		Usuario usuario = usuarioDao.getUsuarioByLegajo(legajo);
		Usuario lider = usuarioDao.getUsuarioByTernro(usuario.getLider());
		UsuarioDto usuarioDto = new UsuarioDto(usuario.getLegajo(),  usuario.getApellido(), usuario.getNombre(),
				usuario.getTernro(), 
				lider==null?null:lider.getLegajo() , 
						lider==null?null:lider.getApellido(), 
								lider==null?null:lider.getNombre(), 
										lider==null?null:lider.getTernro());

		return usuarioDto;
	}

}
