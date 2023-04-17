package com.ca.control.service;

import com.ca.control.dao.MensajeLicenciaDao;
import com.ca.control.dao.UsuarioLicenciaDao;
import com.ca.control.dto.CreateMensajeLicenciaRequest;
import com.ca.control.enums.RolInterno;
import com.ca.control.model.MensajeLicencia;
import com.ca.control.model.Usuario;
import com.ca.control.model.UsuarioLicencia;
import com.ca.control.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MensajeLicenciaService {

    @Autowired
    MensajeLicenciaDao mensajeLicenciaDao;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    UsuarioLicenciaDao usuarioLicenciaDao;

    /**
     * Este metodo se fija si para la licencia, hay notificaciones
     * Se usa en el front para mostrar si hay notificaciones sin tener que hacer una request que pida todos los mensajes o licencias
     * @return
     */
    public Integer getNotificacionesByLicencia(Long id, String token){
        List<MensajeLicencia> mensajes = getAllMensajesByLicencia(id, token);
        AtomicInteger notificaciones = new AtomicInteger();
        Usuario lector = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));


        mensajes.forEach(
                msj -> {
                    if (!msj.isLeido() && msj.getDestinatario().equals(lector)){
                        notificaciones.getAndIncrement();
                    }
                }
        );

        return notificaciones.get();
    }

    public List<MensajeLicencia> getAllMensajesByLicencia(Long idLicencia, String token){
        try {
            UsuarioLicencia licencia = usuarioLicenciaDao.findById(idLicencia).orElseThrow( () -> new IllegalArgumentException("No existe licencia con el id " + idLicencia));
            Usuario lector = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));
            List<MensajeLicencia> mensajes = new ArrayList<>();

            if (lector.getRol().getTipo().equals(RolInterno.ATENCION) || lector.getRol().getTipo().equals(RolInterno.LIDER)){
                //Si es atencion o lider, devuelvo lo que hay en la licencia
                mensajes = mensajeLicenciaDao.findAllByLicencia(licencia).orElse(new ArrayList<>());
            } else {
                //Si es comun devuelvo solo lo que tiene como al usuario de destinatario
                List<MensajeLicencia> resultados = mensajeLicenciaDao.findByLicenciaAndDestinatario(licencia, lector).orElse(new ArrayList<>());
                List<MensajeLicencia> propios = mensajeLicenciaDao.findByLicenciaAndRemitente(licencia, lector).orElse(new ArrayList<>());
                mensajes.addAll(resultados);
                mensajes.addAll(propios);
            }

            return mensajes;
        } catch (Exception e){
            System.out.println("Error en MensajeLicenciaService > getAllMensajesByLicenciaAndUpdateLeido " + e);
            throw e;
        }
    }

    public List<MensajeLicencia> getAllMensajesByLicenciaAndUpdateLeido(Long idLicencia, String token){
        try {
            Usuario lector = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));
            List<MensajeLicencia> mensajes = getAllMensajesByLicencia(idLicencia, token);
            return actualizarVistos(mensajes, lector);
        } catch (Exception e){
            System.out.println("Error en MensajeLicenciaService > getAllMensajesByLicenciaAndUpdateLeido " + e);
            throw e;
        }
    }

    private List<MensajeLicencia> actualizarVistos(List<MensajeLicencia> mensajes, Usuario lector){
        //En cada mensaje me fijo si el remitente es distinto del lector. Si lo es, lo seteo como leido.
        mensajes.forEach(
                (mensaje) -> {
                    if (mensaje.getRemitente() != lector){
                        mensaje.setLeido(true);
                    }
                }
        );
        return mensajeLicenciaDao.saveAll(mensajes);
    }

    public List<MensajeLicencia> createNewMensaje(Long idLicencia, String token, CreateMensajeLicenciaRequest request){
        try {
            Usuario remitente = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));
            Usuario destinatario = usuarioService.findByUsername(request.getDestinatario());
            UsuarioLicencia licencia = usuarioLicenciaDao.findById(idLicencia).orElseThrow(()-> new IllegalArgumentException("No existe licencia con el id " + idLicencia));

            //Creacion y seteo del mensaje
            MensajeLicencia mensaje = new MensajeLicencia();
            mensaje.setLicencia(licencia);
            mensaje.setRemitente(remitente);
            mensaje.setDestinatario(destinatario);
            mensaje.setFecha(new Date());
            mensaje.setTexto(request.getTexto());
            mensaje.setLeido(false);

            //Guardo el mensaje
            mensajeLicenciaDao.save(mensaje);

            //Devuelvo la lista actualizada de mensajes
            return getAllMensajesByLicenciaAndUpdateLeido(idLicencia, token);

        } catch (Exception e){
            System.out.println("Error en MensajeLicenciaService > createNewMensaje " + e);
            throw e;
        }
    }

    public Integer getNotificacionesByUsuario(String token) {
        try {
             Integer notificaciones = 0;
             Usuario usuario = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));

             //Me traigo todos los mensajes para ese usuario y sin leer. Luego, devuelvo la cantidad de resultados
             return mensajeLicenciaDao.findAllByDestinatarioAndLeido(usuario, false).orElse( new ArrayList<>()).size();

        } catch (Exception e){
            System.out.println("Error en MensajeLicenciaService > getNotificacionesByUsuario " + e);
            throw e;
        }
    }
}
