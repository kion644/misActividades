
package com.ca.control.dto;

import com.ca.control.model.Aprobacion;
import com.ca.control.model.Usuario;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioLicenciaResponse {
    private Long idRegistro;
    private String fechaDesde;
    private String fechaHasta;
    private String usuario;
    private String usuario_Modifico;
    private String usuario_Asignado;
    private Date ultima_modificacion;
    private Date fecha_creacion;
    private Integer diasPedido;
    private String estado;
    private Boolean tieneArchivo;
    private Long idProyectoPersona;
    private Integer notificaciones;
    
    private Map<Usuario, Aprobacion> aprobadores;

    private String nombre;

}