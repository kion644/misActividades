package com.ca.control.controller;

import com.ca.control.dto.JsonUserDayRequestDto;
import com.ca.control.service.RegistroHoraService;
import com.ca.control.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.ByteArrayInputStream;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    RegistroHoraService registroHoraService;

    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @RequestMapping(value = "/exportExcelRegistro", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> exportExcelRegistro(@RequestBody JsonUserDayRequestDto json) throws Exception { 
            String fecha = (json.getData().getDay());
           
            ByteArrayInputStream stream = reportService.exportHorasTrabajadas(json);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=RegistroPersonas_" + fecha + ".xls");
            return ResponseEntity.ok().headers(headers).body(new InputStreamResource(stream));
        } 
}
