package com.ca.control.service;

import com.ca.control.dao.NotificacionDao;
import com.ca.control.dto.NotificacionResponse;
import com.ca.control.enums.OrigenNotificacion;
import com.ca.control.model.Notificacion;
import com.ca.control.model.Usuario;
import com.ca.control.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificacionService {

    @Autowired
    NotificacionDao notificacionDao;

    @Autowired
    UsuarioService usuarioService;

    /**
     * Guarda en la base de datos una notificacion, y devuelve la response de la
     * notificacion creada.
     * El username debe ser el de un usuario existente. El Tipo debe ser de un
     * OrigenNotificacion válido.
     * La descripcion puede estar vacia pero no ser null.
     * 
     * @param descripcion El texto de la notificacion
     * @param username    El username del Usuario a quien se notifica
     * @param tipo        El tipo de notificacion
     * @return La Response lista para ser entregada al front-end
     */
    public NotificacionResponse saveOrUpdate(String tituloMail, String username, OrigenNotificacion tipo) {
        try {
            Usuario usuario = usuarioService.findByUsername(username);

            // Creo la notificacion
            Notificacion notificacion = new Notificacion(
                    tituloMail,
                    new Timestamp(System.currentTimeMillis()),
                    usuario,
                    tipo,
                    false);

            // La guardo, genero la response y la devuelvo.
            return getNotificacionResponse(notificacionDao.save(notificacion));
        } catch (Exception e) {
            System.out.println("Error en NotificacionService > saveOrUpdate " + e);
            throw e;
        }
    }

    /**
     * Recibe el JWT y extrae el usuario, lo instancia y con el objeto busca las
     * notificaciones que lo contengan y
     * tengan leido = false
     * Finalmente las transforma en NotificacionResponse y las devuelve
     * 
     * @param token El JWT que se captura del header Authorization en la request
     * @return La lista de NotificacionResponse
     */
    public List<NotificacionResponse> getNoLeidasByUsuario(String token) {
        try {
            Usuario usuario = usuarioService.findByUsername(JwtUtils.extraerUsernameDelToken(token));
            List<Notificacion> notificaciones = notificacionDao.findAllByUsuarioAndVistoNot(usuario, false)
                    .orElse(new ArrayList<>());

            return getNotificacionResponseList(notificaciones);
        } catch (Exception e) {
            System.out.println("Error en NotificacionService > getNoLeidasByUsuario " + e);
            throw e;
        }
    }

    public void leerNotificacion(Long id) {
        try {
            Notificacion notificacion = notificacionDao.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("No existe notificacion con el id " + id));

            notificacion.setVisto(true);

            notificacionDao.save(notificacion);
        } catch (Exception e) {
            System.out.println("Error en NotificacionService > leerNotificacion " + e);
            throw e;
        }

    }

    /* ************** METODOS PRIVADOS ************** */

    /**
     * Toma una lista de notificaciones, la recorre y va obteniendo la Response de
     * cada notificacion. Guarda la
     * response en la lista de NotificacionResponse y cuando termina de recorrer la
     * devuelve.
     * 
     * @param notificacionLst La lista de notificaciones a obtener Response
     * @return La lista de NotificacionResponse
     */
    private List<NotificacionResponse> getNotificacionResponseList(List<Notificacion> notificacionLst) {

        List<NotificacionResponse> toReturn = new ArrayList<>();
        notificacionLst.forEach(
                (notificacion) -> {
                    try {
                        toReturn.add(getNotificacionResponse(notificacion));
                    } catch (Exception e) {
                        System.out.println("Hubo un error agregando a la lista la notificacion " + notificacion);
                    }
                });

        return toReturn;
    }

    /**
     * Toma una Notificacion, crea una NotificacionResponse, le setea los datos de
     * la Notificacion
     * y devuelve la response lista para ser enviada al front-end.
     * La Notificacion no puede tener ningún campo null.
     * 
     * @param notificacion La Notificacion que se va a enviar al front-end
     * @return la Response para enviar al front
     */
    private NotificacionResponse getNotificacionResponse(Notificacion notificacion) {
        try {
            NotificacionResponse response = new NotificacionResponse();

            response.setId(notificacion.getId());
            response.setDescripcion(notificacion.getDescripcion());
            response.setFecha(notificacion.getFecha());
            response.setUsername(notificacion.getUsuario().getUsername());
            response.setVisto(notificacion.isVisto());

            return response;
        } catch (NullPointerException e) {
            System.out.println("Se intento obtener una response de la notificacion " + notificacion.toString());
            System.out.println("No se pudo obtener una response porque tiene valores nulos");
            throw e;
        } catch (Exception e) {
            System.out.println("Error en NotificacionService > getNotificacionResponse " + e);
            throw e;
        }
    }
}
