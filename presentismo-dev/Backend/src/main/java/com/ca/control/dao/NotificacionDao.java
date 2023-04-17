package com.ca.control.dao;

import com.ca.control.model.Notificacion;
import com.ca.control.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificacionDao extends JpaRepository<Notificacion, Long> {

    Optional<List<Notificacion>> findAllByUsuarioAndVistoNot(Usuario usuario, boolean visto);


}
