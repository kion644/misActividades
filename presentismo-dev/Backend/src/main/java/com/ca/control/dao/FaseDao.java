
package com.ca.control.dao;

import com.ca.control.model.Fase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface FaseDao extends JpaRepository<Fase, Long> {

        @Query(value = "CONCAT(p.nombre,\"-\",f.nombre) as 'nombre',f.id as 'id' from proyecto_persona pp inner join proyecto p on pp.proyecto_id=p.id inner join fase f on f.proyecto_id = p.id\n"
                        +
                        "where pp.user_persona = :id", nativeQuery = true)
        public List<Map<?, ?>> fasePorUsuario(@Param(value = "id") Long id);

        public Fase findAllById(Long id);

        public Boolean existsFaseByNombre(String nombre);

        @Query(value = "SELECT * FROM fase WHERE nombre = ?", nativeQuery = true)
        Fase getFaseByNombre(@Param(value = "nombre") String nombre);

        @Query(value = "SELECT * FROM fase WHERE proyecto_id = ?", nativeQuery = true)
        public List<Fase> findAllByProyectoId(@Param(value = "proyecto_id") Long proyecto_id);

        @Query(value = "select * from fase where timesheet_codigo_fase = ?2 and proyecto_id = ?1", nativeQuery = true)
        public Fase findFaseByTimesheetCodigoFaseAndProyectoId(@Param(value = "proyecto_id") Long proyecto_id,
                        @Param(value = "codigoTS") String codigoTS);

        @Query(value = "SELECT * FROM fase", nativeQuery = true)
        List<Fase> getAllFases();

}
