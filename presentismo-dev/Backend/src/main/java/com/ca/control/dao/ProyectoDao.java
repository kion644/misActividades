
package com.ca.control.dao;

 
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Cliente;
import com.ca.control.model.Feriado;
  
import com.ca.control.model.Proyecto;
  
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Date;
import java.util.List;

@Repository
public interface ProyectoDao extends JpaRepository<Proyecto, Long> {

    Proyecto findByTimesheetClaveProyecto(String timesheetClaveProyecto);

    @Query(value = "SELECT * FROM proyecto", nativeQuery = true)
    List<Proyecto> getAllProyectos();
    @Query(value = "SELECT * FROM proyecto WHERE estado='ACTIVO' ORDER BY tipo_proyecto desc, nombre ", nativeQuery = true)
    List<Proyecto> getAllProyectosActivos();

    boolean existsByNombreAndClienteId(@Param(value = "nombre") String nombre, @Param(value = "id_cliente") Long id_cliente);
 
  List<Proyecto> findAllByCasoNegocio(CasoNegocio casoNegocio);

    Boolean existsProyectoByNombre(String nombre);
    Boolean existsProyectoByTimesheetCodigoInterno(String nombre);
    Boolean existsProyectoByTimesheetClaveProyecto(String nombre);

    @Query(value = "SELECT * FROM proyecto WHERE tipo_proyecto='LICENCIA'", nativeQuery = true)
    List<Proyecto> getAllProyectosTipoLicencia();
    @Query(value = "SELECT * FROM proyecto WHERE tipo_proyecto='PRODUCTIVA'", nativeQuery = true)
    List<Proyecto> getAllProyectosTipoProductiva();
    @Query(value = "SELECT * FROM proyecto WHERE tipo_proyecto='PRODUCTIVA' AND estado = 'ACTIVO'", nativeQuery = true)
    List<Proyecto> getAllProyectosTipoProductivaActivo();
  
}



