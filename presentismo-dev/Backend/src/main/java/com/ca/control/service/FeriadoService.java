package com.ca.control.service;

import com.ca.control.dao.FeriadoDao;
import com.ca.control.dao.PaisDao;
import com.ca.control.dto.AltaFeriadoDto;
import com.ca.control.model.Feriado;
import com.ca.control.utils.FormatoFecha;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class FeriadoService {

    @Autowired
    FeriadoDao feriadoDao;

    @Autowired
    PaisDao paisDao;

    public boolean createFeriado(AltaFeriadoDto json) throws Exception {

        try {
            if (feriadoDao.existsByFecha(FormatoFecha.deStringDate(json.getFecha()))){
                    throw new Exception("Ya existe un feriado en este día");
            }
            else{
                Feriado feriadoNuevo = new Feriado();
                feriadoNuevo.setId(json.getRegistroId());
                feriadoNuevo.setDescripcion(json.getDescripcion());
                feriadoNuevo.setFecha(FormatoFecha.deStringDate(json.getFecha()));
                feriadoNuevo.setPais(paisDao.findById(json.getIdPais()).orElseThrow(() -> new Exception("Error al crear feriado: El país ingresado no se ha encontrado")));
                feriadoDao.save(feriadoNuevo);
                return true;
                }
        }
        catch (Exception e){
            throw e;
        }
    }


    public boolean editFeriado(AltaFeriadoDto json) throws Exception {
        try {

            Feriado feriadoAEditar = feriadoDao.findById(json.getRegistroId()).orElseThrow(() -> new Exception("Error al editar feriado: El feriado con el id ingresado no se ha encontrado"));
            if(feriadoDao.existsByFecha(FormatoFecha.deStringDate(json.getFecha()))){
                Feriado feriadoExistente = feriadoDao.getAllByFecha(FormatoFecha.deStringDate(json.getFecha()));
                if(!feriadoExistente.getId().equals(feriadoAEditar.getId())){
                    throw new Exception("Ya existe un feriado en este día");
                }
            }
            feriadoAEditar.setFecha(json.getFecha() != null ? FormatoFecha.deStringDate(json.getFecha()) : feriadoAEditar.getFecha());
            feriadoAEditar.setDescripcion(json.getDescripcion() != null ? json.getDescripcion() : feriadoAEditar.getDescripcion());
            feriadoAEditar.setPais(json.getIdPais() != null ? paisDao.findById(json.getIdPais()).orElseThrow(() -> new Exception("Error al editar feriado: El pais ingresado no se ha encontrado")) : feriadoAEditar.getPais());
            feriadoDao.save(feriadoAEditar);
            return true;

        }
        catch (Exception e) {
            throw e;
        }
    }

    public boolean deleteFeriado(Integer id) throws Exception {
        try {
            Feriado feriadoABorrar = feriadoDao.findById(id).orElseThrow(() -> new Exception("Error al borrar feriado: No se encontró ningun feriado con este Id"));
            feriadoDao.deleteById(feriadoABorrar.getId());
            return true;
        }
        catch (Exception e){
            throw e;
        }
    }

    public Feriado findById(Integer id) throws Exception {
        try{

            return feriadoDao.findById(id).orElseThrow(() -> new Exception("Error al encontrar feriado: No se encontró ningun feriado con este id"));

        }
        catch (Exception e) {
            throw e;
        }

    }

    public List<AltaFeriadoDto> findAll() throws Exception{
        try{
            List<Feriado> lst = feriadoDao.getAllFeriados();

            return getAltaFeriadoDto(lst);
        }
        catch (Exception e) {
            throw e;
        }
    }

    public List<Feriado> feriadosImport(MultipartFile excel){

        List<Feriado> feriadosAImportar = new ArrayList<Feriado>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(excel.getInputStream());
            XSSFSheet worksheet = workbook.getSheetAt(0);

            for (int i=1; i<worksheet.getPhysicalNumberOfRows(); i++){
                Feriado f = new Feriado();

                XSSFRow row = worksheet.getRow(i);
                //TODO Leer valores del excel según la posición

            }
        }
        catch (Exception e){

        }

        return feriadosAImportar;
    }


    public boolean copyFeriado(AltaFeriadoDto json) throws Exception {

        try{
            Feriado feriadoACopiar = feriadoDao.findById(json.getRegistroId()).orElseThrow(() -> new Exception("Error al copiar feriado. No se ha encontrado un feriado con este id"));
            Feriado copia = new Feriado();
            copia.setFecha(json.getFecha() != null ? FormatoFecha.deStringDate(json.getFecha()) : feriadoACopiar.getFecha());
            copia.setDescripcion(json.getDescripcion() != null ? json.getDescripcion() : feriadoACopiar.getDescripcion());
            copia.setPais(json.getIdPais() != null ? paisDao.findById(json.getIdPais()).orElseThrow(() -> new Exception("Error al editar feriado: El pais ingresado no se ha encontrado")) : feriadoACopiar.getPais());
            copia.setFecha(json.getFecha() != null ? FormatoFecha.deStringDate(json.getFecha()) : feriadoACopiar.getFecha());
            feriadoDao.save(copia);
            return true;
        }catch (Exception e){
            throw e;
        }
    }


    public List<AltaFeriadoDto> getAltaFeriadoDto(List<Feriado> lst){
        try {

            List<AltaFeriadoDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (feriado) -> {
                       try{
                           AltaFeriadoDto dto = new AltaFeriadoDto(
                                   feriado.getId(),
                                   feriado.getFecha().toString(),
                                   feriado.getPais().getIdPais(),
                                   feriado.getDescripcion()
                           );
                           toReturn.add(dto);

                       }catch (Exception e){
                           System.out.println("El feriado de id " + feriado.getId() + " tiene un valor null");

                       }
                    }
            );
            return toReturn;

        }catch (Exception e) {
            System.out.println("Error en FeriadoService > getAltaFeriadoDto " + e);
            return null;
        }
    }
}
