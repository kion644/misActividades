package com.ca.control.config;

import com.ca.control.service.LogAuditoriaService;
import com.ca.control.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.AbstractRequestLoggingFilter;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class CustomRequestLoggingFilter extends AbstractRequestLoggingFilter {
    @Autowired
    LogAuditoriaService logAuditoriaService;
    private static final Logger fileLogger = LoggerFactory.getLogger("requests");

    Set<String> endpointsIgnorados = new HashSet<>(Arrays.asList(
            "/completeRegistro",
            "/status",
            "/HorasTrabajadas",
            "/lugarTrabajo",
            "/subditos"
        )
    );

    @Override
    protected void beforeRequest(HttpServletRequest request, String message) {
        //Deshabilitado
    }

    @Override
    protected void afterRequest(HttpServletRequest request, String message) {
        //Si es una request para autenticar no debo loggear la password
        if ("/auth".equals(request.getRequestURI()) || "/auth/developer".equals(request.getRequestURI())){
            fileLogger.info(message.substring(0, message.indexOf("password")));
        } else {

            String username = JwtUtils.extraerUsernameDelToken(request.getHeader(HttpHeaders.AUTHORIZATION));

            String path;
            String payload = "";

            if (message.contains("payload")){
                path = message.substring(0,message.indexOf("payload"));
                payload = message.substring(message.indexOf("{") + 1);
            } else {
                path = message;
            }

            fileLogger.info(" Usuario: " + username + " || Request: [" + message);
            
            String finalPath = path;
            String finalPayload = payload;
            logAuditoriaService.saveLog(username, finalPath, finalPayload);
        }

    }


    @Override
    protected boolean shouldLog(HttpServletRequest request) {
        String url = request.getRequestURI();
        if(endpointsIgnorados.contains(request.getRequestURI()))  {
            return false;
        }
        return fileLogger.isDebugEnabled();
    }
}
