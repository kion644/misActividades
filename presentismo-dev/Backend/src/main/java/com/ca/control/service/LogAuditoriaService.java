package com.ca.control.service;

import com.ca.control.dao.LogAuditoriaDao;
import com.ca.control.model.LogAuditoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class LogAuditoriaService {

    @Autowired
    LogAuditoriaDao logAuditoriaDao;

    public void saveLog(String username, String path, String payload){

        LogAuditoria log = new LogAuditoria();

        //Fecha actual
        log.setFecha( new Timestamp(new Date().getTime()));
        log.setUsername(username);
        log.setPath(path);
        log.setPayload(payload);

        logAuditoriaDao.save(log);
    }
}
