package com.ca.control.controller;

import com.ca.control.service.RegistroHoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class AccederController {

    @Autowired
    RegistroHoraService registroHoraService;

    @PostMapping(path = "/completeRegistro")
    public ResponseEntity obtenerDia(@RequestHeader String user){
    
        return new ResponseEntity<>(new Date(), HttpStatus.OK);
        
    }
}
