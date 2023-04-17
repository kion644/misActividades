package com.cda.np.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cda.np.model.Usuario;

public interface UsuarioDao extends JpaRepository<Usuario, String>{
	
	public Usuario getUsuarioByLegajo(String legajo);
	public Usuario getUsuarioByTernro(String ternro);
}
