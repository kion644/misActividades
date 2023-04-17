package com.ca.control.model;

import com.ca.control.enums.EstadoProyecto;
import com.ca.control.enums.TipoProyectoEnum;
 

import lombok.Data;

  
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
  
@Data
@Entity
@Table(name = "proyecto")
public class Proyecto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	private Long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "fecha_inicio")
    private String fechaInicio;

	@Column(name = "fecha_alta")
    private String fechaAlta;

	@Column(name = "fecha_fin_estimada")
    private String fechaFinEstimada;

	@Column(name = "fecha_fin_real")
    private String fechaFinReal;

	@Column(name = "fecha_ultima_actualizacion")
    private String fechaUltimaActualizacion;

	@Column(name = "horas_cliente")
    private Long horasCliente;

	@Column(name = "estado")
	@Enumerated(EnumType.STRING)
	private EstadoProyecto estado;

	@JoinColumn(name = "id_cliente", referencedColumnName = "id")
	@ManyToOne(cascade = CascadeType.DETACH)
	private Cliente cliente;

	@JoinColumn(name = "id_cn", referencedColumnName = "id_cn")
	@ManyToOne(cascade = CascadeType.DETACH)
	private CasoNegocio casoNegocio;

	@Column(name = "timesheet_clave_proyecto")
	private String timesheetClaveProyecto;

	@Column(name = "timesheet_codigo_interno")
	private String timesheetCodigoInterno;

	@Column(name = "tipo_proyecto")
	@Enumerated(EnumType.STRING)
	private TipoProyectoEnum tipoProyecto;

	@Column(name = "comentario_cierre_proyecto")
	private String comentarioCierreProyecto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getHorasCliente() {
		return horasCliente;
	}

	public void setHorasCliente(Long horasCliente) {
		this.horasCliente = horasCliente;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public EstadoProyecto getEstado() {
		return estado;
	}

	public void setEstado(EstadoProyecto estado) {
		this.estado = estado;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public String getTimesheetClaveProyecto() {
		return timesheetClaveProyecto;
	}

	public void setTimesheetClaveProyecto(String timesheetClaveProyecto) {
		this.timesheetClaveProyecto = timesheetClaveProyecto;
	}

	public String getTimesheetCodigoInterno() {
		return timesheetCodigoInterno;
	}

	public void setTimesheetCodigoInterno(String timesheetCodigoInterno) {
		this.timesheetCodigoInterno = timesheetCodigoInterno;
	}

	public TipoProyectoEnum getTipoproyecto() {
		return tipoProyecto;
	}

	public void setTipoProyecto(TipoProyectoEnum tipoProyecto) {
		this.tipoProyecto = tipoProyecto;
	}

	public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
	public String getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(String fechaAlta) {
        this.fechaAlta = fechaAlta;
    }
    public String getFechaFinEstimada() {
        return fechaFinEstimada;
    }

    public void setFechaFinEstimada(String fechaFinEstimada) {
        this.fechaFinEstimada = fechaFinEstimada;
    }
    public String getFechaFinReal() {
        return fechaFinReal;
    }

    public void setFechaFinReal(String fechaFinReal) {
        this.fechaFinReal = fechaFinReal;
    }
    public String getFechaUltimaActualizacion() {
        return fechaUltimaActualizacion;
    }

    public void setFechaUltimaActualizacion(String fechaUltimaActualizacion) {
        this.fechaUltimaActualizacion = fechaUltimaActualizacion;
    }
	

	@Transient
	public String getNombreClienteProyecto() {
		return getCliente().getNombre() + "/" + getNombre();
	}

}
