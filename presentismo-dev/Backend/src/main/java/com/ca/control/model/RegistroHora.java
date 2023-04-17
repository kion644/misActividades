package com.ca.control.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import com.ca.control.enums.EstadoRegistroHora;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "registro_horas")
public class RegistroHora implements Serializable {

    private static final long serialVersionUID = 1L;
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @NotEmpty
    @Column(name = "inicio")
    private Timestamp inicio;

    @Column(name = "fin")
    private Timestamp fin;

    @Column(name = "cambio_inicio")
    private Timestamp cambioInicio;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "justificacion")
    private String justificacion;

    @Column(name = "justificacion_calendario")
    private String justificacionCalendario;

    //nuevo - editado
    @JoinColumn(name = "id_caracteristica")
    private String caracteristica;

    //aceptado-rechazado
    @JoinColumn(name = "id_Estado_Registro")
    private String estadoRegistro;

    @JoinColumn(name = "id_fase", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Fase fase;


    @JoinColumn(name = "id_lugar_trabajo", referencedColumnName = "id")
    @OneToOne(cascade = CascadeType.DETACH)
    private LugarTrabajo lugarTrabajo;


    @JoinColumn(name = "id_tipo_hora", referencedColumnName = "id")
    @OneToOne(cascade = CascadeType.DETACH)
    private TipoHora tipoHora;
    
    @NotNull
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Usuario usuario;

    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Cliente cliente;
    
    @NotNull
    @JoinColumn(name = "id_lider", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Usuario lider;

    @Column(name="proyextoText")
    private String proyectoText;

    @Transient
    private double horasTrabajadas;

    @Enumerated(EnumType.STRING)
    private EstadoRegistroHora estadoRegistroHora;

    private Timestamp fechaProcesado;

    @Column(name = "fechaUltimaEdicion")
    private Date fechaUltimaEdicion;

    @Column(name = "usuarioUltimaEdicion")
    private String usuarioUltimaEdicion;


    //*** Getter y Setter

	public Long getId() {
		return id;
	}

	public String getProyectoText() {
		return proyectoText;
	}

	public void setProyectoText(String proyectoText) {
		this.proyectoText = proyectoText;
	}

	public void setLider(Usuario lider) {
		this.lider = lider;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Timestamp getInicio() {
		return inicio;
	}

	public void setInicio(Timestamp inicio) {
		this.inicio = inicio;
	}

	public Timestamp getFin() {
		return fin;
	}

	public void setFin(Timestamp fin) {
		this.fin = fin;
	}

	public Timestamp getCambioInicio() {
		return cambioInicio;
	}

	public void setCambioInicio(Timestamp cambioInicio) {
		this.cambioInicio = cambioInicio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getJustificacion() {
		return justificacion;
	}

	public void setJustificacion(String justificacion) {
		this.justificacion = justificacion;
	}

	
	public LugarTrabajo getLugarTrabajo() {
		return lugarTrabajo;
	}

	public void setLugarTrabajo(LugarTrabajo lugarTrabajo) {
		this.lugarTrabajo = lugarTrabajo;
	}

	public TipoHora getTipoHora() {
		return tipoHora;
	}

	public void setTipoHora(TipoHora tipoHora) {
		this.tipoHora = tipoHora;
	}

	

	public String getCaracteristica() {
		return caracteristica;
	}

	public void setCaracteristica(String caracteristica) {
		this.caracteristica = caracteristica;
	}

	public String getEstadoRegistro() {
		return estadoRegistro;
	}

	public void setEstadoRegistro(String estadoRegistro) {
		this.estadoRegistro = estadoRegistro;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

    public Usuario getLider() {
		return lider;
	}

	public void setCliente( Usuario lider) {
		this.lider = lider;
	}

      
    public void setFase(Fase fase){
            this.fase=fase;
        }
        public Fase getFase(){
            return this.fase;
        }

    public Date getFechaUltimaEdicion() {
        return fechaUltimaEdicion;
    }

    public void setFechaUltimaEdicion(Date fechaUltimaEdicion) {
        this.fechaUltimaEdicion = fechaUltimaEdicion;
    }

    public String getUsuarioUltimaEdicion() {
        return usuarioUltimaEdicion;
    }

    public void setUsuarioUltimaEdicion(String usuarioUltimaEdicion) {
        this.usuarioUltimaEdicion = usuarioUltimaEdicion;
    }


    //*** Constructores
        
	public RegistroHora() {
    }

    public RegistroHora(Long id, Timestamp inicio, Timestamp fin, Fase fase, LugarTrabajo lugarTrabajo, TipoHora tipoHora, String caracteristica, Usuario usuario, Cliente cliente) {
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.fase = fase;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
 
        this.caracteristica = caracteristica;
        this.usuario = usuario;
        this.cliente = cliente;
    }

    public RegistroHora(Long id,Timestamp inicio, Timestamp fin, Fase fase, LugarTrabajo lugarTrabajo, TipoHora tipoHora, Cliente cliente) {
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.fase = fase;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.cliente = cliente;
    }


    public RegistroHora(Timestamp inicio, LugarTrabajo lugarTrabajo, TipoHora tipoHora, Usuario usuario) {
        this.inicio = inicio;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.usuario = usuario;
    }

    public RegistroHora(Timestamp inicio, LugarTrabajo lugarTrabajo, TipoHora tipoHora, Usuario usuario, Usuario lider) {
        this.inicio = inicio;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.usuario = usuario;
        this.lider = lider;
    }

    
    public RegistroHora(Timestamp inicio, TipoHora tipoHora,Usuario usuario){
            this.inicio =inicio;
            this.tipoHora= tipoHora;
            this.usuario= usuario;

    }

    public boolean esVacio() {
        return this.getId()==null;
    }

    public RegistroHora(Long id, Timestamp inicio, Timestamp cambioInicio, String justificacion, Usuario usuario) {
        this.id = id;
        this.inicio = inicio;
        this.cambioInicio = cambioInicio;
        this.justificacion = justificacion;
        this.usuario = usuario;
    }

    public RegistroHora(Long id, Timestamp inicio, Timestamp fin, Timestamp cambioInicio, String descripcion, String justificacion, Fase fase, LugarTrabajo lugarTrabajo, TipoHora tipoHora, String caracteristica, String estadoRegistro, Usuario usuario, Cliente cliente) {
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.cambioInicio = cambioInicio;
        this.descripcion = descripcion;
        this.justificacion = justificacion;
        this.fase = fase;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.caracteristica = caracteristica;
        this.estadoRegistro = estadoRegistro;
        this.usuario = usuario;
        this.cliente = cliente;
    }

    public RegistroHora(Long id, Timestamp inicio, Timestamp fin, Timestamp cambioInicio, String descripcion, String justificacion,  String caracteristica, String estadoRegistro, Fase fase, LugarTrabajo lugarTrabajo, TipoHora tipoHora, Usuario usuario, Cliente cliente, Usuario lider) {
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.cambioInicio = cambioInicio;
        this.descripcion = descripcion;
        this.justificacion = justificacion;     
        this.caracteristica = caracteristica;
        this.estadoRegistro = estadoRegistro;
        this.fase = fase;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.usuario = usuario;
        this.cliente = cliente;
        this.lider = lider;
    }

    public RegistroHora(Long id, Timestamp inicio, Timestamp fin, Timestamp cambioInicio, String descripcion, String justificacion, String caracteristica, String estadoRegistro, Fase fase, LugarTrabajo lugarTrabajo, TipoHora tipoHora, Usuario usuario, Cliente cliente, Usuario lider, String proyectoText) {
        this.id = id;
        this.inicio = inicio;
        this.fin = fin;
        this.cambioInicio = cambioInicio;
        this.descripcion = descripcion;
        this.justificacion = justificacion;
        this.caracteristica = caracteristica;
        this.estadoRegistro = estadoRegistro;
        this.fase = fase;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.usuario = usuario;
        this.cliente = cliente;
        this.lider = lider;
        this.proyectoText = proyectoText;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}
