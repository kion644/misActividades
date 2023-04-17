package com.ca.control.service;


import java.util.ArrayList;
import java.util.List;

import com.ca.control.dao.RolDao;
import com.ca.control.dto.RolesDto;
import com.ca.control.dto.UsuarioRoleDTO;
import com.ca.control.model.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.ca.control.dao.UsuarioDao;
import com.ca.control.model.Usuario;
import com.ca.control.utils.JwtUtils;

@Service
@Transactional
public class RolesService {


    @Autowired
    UsuarioDao usuarioDao;

    @Autowired
    RolDao rolDao;

    public List<RolesDto> findAll(String token) throws Exception {
        try {
            List<Usuario> lst = usuarioDao.findAllUsuarios(JwtUtils.extraerUsernameDelToken(token));
            return getRolesDto(lst);
        } catch (Exception e) {
            throw e;
        }

    }

    private List<RolesDto> getRolesDto(List<Usuario> lst) {
        try {

            List<RolesDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (usuario) -> {
                        try {
                            RolesDto dto = new RolesDto(
                                    usuario.getId(),
                                    usuario.getApellido(),
                                    usuario.getNombre(),
                                    usuario.getUsername(),
                                    usuario.getRol(),
                                    usuario.getLider());
                            toReturn.add(dto);
                        } catch (Exception e) {
                            System.out.println("El usuario de id " + usuario.getId() + " tiene un valor null");

                        }
                    });
            return toReturn;

        } catch (Exception e) {
            System.out.println("Error en RolesService > getRolesDto " + e);
            return null;
        }
    }

    public boolean update(UsuarioRoleDTO dto) {

        if (dto.getUsername() == null || dto.getUsername().isEmpty()) return false;

        Usuario userToUpdate = usuarioDao.findByUsername(dto.getUsername());

        Rol roleToUser =  rolDao.findAll().stream().filter(y -> y.getTipo().name().equals(dto.getRole())).findFirst().get();

        userToUpdate.setRol(roleToUser);

        usuarioDao.save(userToUpdate);

        return true;
    }


}