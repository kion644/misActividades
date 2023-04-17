package com.ca.control.controller;

import com.ca.control.dao.UsuarioDao;
import com.ca.control.dto.AllUsers;
import com.ca.control.dto.LideresResponse;
import com.ca.control.model.Usuario;
import com.ca.control.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class UsuarioController
{
    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private UsuarioService usuarioService;

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    //TODO: mover este endpoint a /usuarios/delegaciones o algo mas especifico a delegaciones ya que no es mas
    // un endpoint generico que solo trae usuarios. y falta el servicio aca nose porque estaria un dao o repository en un controller
    @GetMapping(path = "/usuarios/{id}")
    public ResponseEntity<List<Usuario>> getUsuarios(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable long id)
    {
        List<Usuario> usuariosDestinatarios = (List<Usuario>)this.usuarioDao.listaUsuariosDestinatarios(id);

        List<Usuario> usuariosNoDestinatarios = (List<Usuario>)this.usuarioDao.listaUsuariosNoDestinatarios(id);

        usuariosDestinatarios.addAll(usuariosNoDestinatarios);

        return new ResponseEntity<>(usuariosDestinatarios, HttpStatus.OK);
    }

    @GetMapping(path = "/lideres")
    public ResponseEntity<List<LideresResponse>> getAllLideres(){
        try {
            return new ResponseEntity<>(usuarioService.getAllLideres(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuariosController > getAllLideres: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/allUsers")
    public ResponseEntity<List<Usuario>> getAllUsuarios(){
        try {
            return new ResponseEntity<>(usuarioService.getAllUsuario(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuariosController > getAllUsuario: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

