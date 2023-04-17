package com.ca.control.controller;

import com.ca.control.model.Pais;
import com.ca.control.service.PaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET})
public class PaisController {

    @Autowired
    PaisService paisService;

    @GetMapping(path = "/paises")
    public ResponseEntity<List<Pais>> getPaises(){
        try{
            return new ResponseEntity<>(paisService.findAll(), HttpStatus.OK);
        }

        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
