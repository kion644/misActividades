package com.ca.control.controller;

import com.ca.control.dto.JsonDto;
import com.ca.control.dto.JsonListDto;
import com.ca.control.service.TipoHoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class TipoHoraController {

    @Autowired
    TipoHoraService tipoHoraService;

    @RequestMapping(value = "/tipoHora", method = RequestMethod.POST)
    public ResponseEntity<JsonListDto> listarTipoHora(@RequestBody JsonDto json) {

        return tipoHoraService.listarTipoHoras(json);
    }
}
