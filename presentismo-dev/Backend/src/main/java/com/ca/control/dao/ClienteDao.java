
package com.ca.control.dao;

import com.ca.control.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteDao extends JpaRepository<Cliente, Long> {

    public Cliente findAllById(Long id);

    public Boolean existsClienteByNombre(String nombre);

    public Cliente findByNombre(String nombre);

    @Query(value = "SELECT * FROM cliente ORDER BY nombre ASC", nativeQuery = true)
    List<Cliente> getAllClientes();
}
