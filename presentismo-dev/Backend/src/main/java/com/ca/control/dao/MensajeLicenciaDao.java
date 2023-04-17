package com.ca.control.dao;

import com.ca.control.model.MensajeLicencia;
import com.ca.control.model.Usuario;
import com.ca.control.model.UsuarioLicencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MensajeLicenciaDao extends JpaRepository<MensajeLicencia, Long> {


    Optional<List<MensajeLicencia>> findAllByLicencia(UsuarioLicencia licencia);

    Optional<List<MensajeLicencia>> findByLicenciaAndDestinatario(UsuarioLicencia licencia, Usuario destinatario);

    Optional<List<MensajeLicencia>> findByLicenciaAndRemitente(UsuarioLicencia licencia, Usuario remitente);

    Optional<List<MensajeLicencia>> findAllByDestinatarioAndLeido(Usuario destinatario, boolean leido);


}
