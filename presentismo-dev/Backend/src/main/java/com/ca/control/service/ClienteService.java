package com.ca.control.service;

import com.ca.control.dao.ClienteDao;
import com.ca.control.dto.ComboDto;
import com.ca.control.model.Cliente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ClienteService {

    @Autowired
    ClienteDao clienteDao;

    private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);

    public boolean createCliente(Cliente cliente) throws Exception {
        try {
            if (clienteDao.existsClienteByNombre(cliente.getNombre())) {
                throw new Exception("Ya existe un cliente con este nombre");
            } else {
                Cliente clienteNuevo = new Cliente();
                clienteNuevo.setNombre(cliente.getNombre());
                clienteDao.save(clienteNuevo);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean editCliente(Cliente cliente) throws Exception {
        try {
            Cliente clienteAEditar = clienteDao.findById(Long.valueOf(cliente.getId())).orElseThrow(
                    () -> new Exception("Error al editar cliente: El cliente con el id ingresado no se ha encontrado"));
            if (clienteDao.existsClienteByNombre(cliente.getNombre())) {
                throw new Exception("Ya existe un cliente con este nombre");
            } else {
                clienteAEditar.setNombre(
                        cliente.getNombre() != null ? cliente.getNombre() : clienteAEditar.getNombre());
                clienteDao.save(clienteAEditar);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteCliente(Integer id) throws Exception {
        try {
            Cliente clienteABorrar = clienteDao.findById(Long.valueOf(id)).orElseThrow(
                    () -> new Exception("Error al borrar cliente: No se encontró ningun cliente con este Id"));
            clienteDao.deleteById(Long.valueOf(clienteABorrar.getId()));
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public Cliente findById(Integer id) throws Exception {
        try {

            return clienteDao.findById(Long.valueOf(id)).orElseThrow(
                    () -> new Exception("Error al encontrar cliente: No se encontró ningun cliente con este id"));

        } catch (Exception e) {
            throw e;
        }

    }

    public List<ComboDto> findAll() throws Exception {
        try {
            List<Cliente> lst = clienteDao.getAllClientes();
            return getComboDto(lst);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<ComboDto> getComboDto(List<Cliente> lst) {
        try {

            List<ComboDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (cliente) -> {
                        try {
                            ComboDto dto = new ComboDto(
                                    cliente.getId(),
                                    cliente.getNombre());
                            toReturn.add(dto);
                        } catch (Exception e) {
                            System.out.println("El Cliente de id " + cliente.getId() + " tiene un valor null");

                        }
                    });
            return toReturn;

        } catch (Exception e) {
            System.out.println("Error en ClienteService > getComboDto " + e);
            return null;
        }
    }
}
