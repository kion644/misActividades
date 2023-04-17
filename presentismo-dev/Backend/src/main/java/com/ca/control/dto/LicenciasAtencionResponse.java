package com.ca.control.dto;

import com.ca.control.model.UsuarioLicencia;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class LicenciasAtencionResponse {
    List<UsuarioLicencia> tomadas;
    List<UsuarioLicencia> paraTomar;
}
