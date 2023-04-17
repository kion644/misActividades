package com.ca.control.service;

import com.ca.control.dao.RegistroHoraDao;
import com.ca.control.dto.DatosExcelDto;
import com.ca.control.dto.JsonUserDayRequestDto;
import com.ca.control.enums.EstadoRegistroHora;
import com.ca.control.model.RegistroHora;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReportService {

    @Autowired
    RegistroHoraDao registroHoraDao;

    @Autowired
    RegistroHoraService registroHoraService;

    private static final Logger logger = LoggerFactory.getLogger(ReportService.class);

    public ByteArrayInputStream exportHorasTrabajadas(JsonUserDayRequestDto json) throws IOException {

        logger.info("Iniciando exportación de hs en excel");
        Date inicio = new Date();

        Workbook workbook = new HSSFWorkbook(); //Creo un libro
        ByteArrayOutputStream stream = new ByteArrayOutputStream(); //Creo el stream
        Sheet sheet = workbook.createSheet("Registro_persona"); //Nombro la hoja

        //Creo una fila vacia y luego le pongo los encabezados
        Row row = sheet.createRow(0);
        String[] columns = {
                    "Clave del proyecto", 
                    "Codigo interno del proyecto", 
                    "Codigo Fase", 
                    "Codigo Recurso", 
                    "Legajo Recurso", 
                    "Fecha desde", 
                    "Fecha hasta", 
                    "Horas", 
                    "Descripcion"
        };

        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }

        List<RegistroHora> registroHoraLst = new ArrayList<>();
        List<RegistroHora> registrosFinales = new ArrayList<>();
        List<DatosExcelDto> excelDtoList = new ArrayList<>();

        try {
            registroHoraLst = getRegistrosExportables();

            registrosFinales = calcuarHorasTrabajadas(registroHoraLst);
        } catch (Exception e){
            System.out.println("Error en ReportService > exportHorasTrabajadas > getFinalizadosYProcesadosHoy " + e);
        }

        //Los convierto al dto que uso para generar el excel
        try {
            excelDtoList = getDatosExcelDto(registrosFinales);
        } catch (Exception e){
            System.out.println("Error en ReportService > exportHorasTrabajadas > getDatosExcelDto " + e);
        }

        int initRow = 1;

        //Recorro el registro y tomo el valor y lo asigno a la columna
        for (DatosExcelDto datoExcel : excelDtoList) {

            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(datoExcel.getClaveProyecto());
            row.createCell(1).setCellValue(datoExcel.getCodigoInternoProyecto());
            row.createCell(2).setCellValue(datoExcel.getCodigoFase());
            row.createCell(3).setCellValue(datoExcel.getCodigoRecurso());
            row.createCell(4).setCellValue(datoExcel.getLegajoRecurso());
            row.createCell(5).setCellValue(datoExcel.getFechaDesde());
            row.createCell(6).setCellValue(datoExcel.getFechaHasta());
            row.createCell(7).setCellValue(datoExcel.getHoras());
            row.createCell(8).setCellValue(datoExcel.getDescripcion());
            initRow++;
        }

        //Escribimos lo que hicimos en el workbook y lo guardamos en un string
        workbook.write(stream);
        workbook.close();

        //Seteo el estado a procesado y actualizo en la base antes de enviar el excel
        procesarGuardarYLimpiar();

        Date fin = new Date();
        Long tiempo = fin.getTime() - inicio.getTime();

        logger.info("Proceso de exportacion finalizado, tiempo total {} ms", tiempo);

        return new ByteArrayInputStream(stream.toByteArray());
    }

    private void procesarGuardarYLimpiar() {
        Timestamp ahora = new Timestamp(System.currentTimeMillis());
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime fechaDesde = now.with(LocalTime.MIDNIGHT);
        LocalDateTime fechaHasta = now.with(LocalTime.MAX);
        List<RegistroHora> listaAGuardarYLimpiar = registroHoraDao.findAllByEstadoRegistroHoraAndinicioBeforeClean(EstadoRegistroHora.FINALIZADO.toString(),
                Timestamp.valueOf(fechaDesde), Timestamp.valueOf(fechaDesde), Timestamp.valueOf(fechaHasta));
        //fixme
        logger.info("Iniciando marcado de procesados");
        
        listaAGuardarYLimpiar.forEach(
                (registroHora) -> {
                    registroHora.setEstadoRegistroHora(EstadoRegistroHora.PROCESADO);
                    registroHora.setFechaProcesado(ahora);
                }
        );

        registroHoraDao.saveAllAndFlush(listaAGuardarYLimpiar);

        logger.info("Finalizado marcado de procesdos");
    }

    public List<RegistroHora> getRegistrosExportables(){

        //TODO implementar algo mejor y mas resumido en el Util de tiempo
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fechaDesde = ahora.with(LocalTime.MIDNIGHT);
        LocalDateTime fechaHasta = ahora.with(LocalTime.MAX);
        Timestamp timestampDesde = Timestamp.valueOf(fechaDesde);
        Timestamp timestampHasta = Timestamp.valueOf(fechaHasta);

        List<RegistroHora> resultados = registroHoraDao.findAllByEstadoRegistroHoraAndinicioBefore(EstadoRegistroHora.FINALIZADO.toString(), Timestamp.valueOf(fechaDesde), Timestamp.valueOf(fechaDesde), Timestamp.valueOf(fechaHasta));

        //Me quedo solo los registros que tienen el dia finalizado y lo devuelvo
         return resultados;//.stream().filter( rh -> registroHoraService.filtrarDiasInvalidos(rh)).collect(Collectors.toList());
    }

    private List<RegistroHora> calcuarHorasTrabajadas(List<RegistroHora> resultados) {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fechaDesde = ahora.with(LocalTime.MIDNIGHT);
        LocalDateTime fechaHasta = ahora.with(LocalTime.MAX);
        resultados.forEach(
                registroHora -> {
                    try {
                        LocalDateTime inicioDelDia = LocalDateTime.of(registroHora.getInicio().toLocalDateTime().toLocalDate(), LocalTime.MIDNIGHT);
                        LocalDateTime finDelDia = LocalDateTime.of(registroHora.getInicio().toLocalDateTime().toLocalDate(), LocalTime.MAX);
                        registroHora.setHorasTrabajadas(
                                registroHoraDao
                                        .findHorasTrabajadasByFaseAndUsuarioBetweenHorarioAndEstadoRegistroHora(
                                                registroHora.getUsuario(),
                                                registroHora.getFase(),
                                                Timestamp.valueOf(inicioDelDia),
                                                Timestamp.valueOf(finDelDia),
                                                EstadoRegistroHora.FINALIZADO.toString(),
                                                Timestamp.valueOf(fechaDesde),
                                                Timestamp.valueOf(fechaHasta)
                                        )
                                        .getHorasReales()
                        );

                    }   catch (NullPointerException nex){
                        System.out.println("El registroHora Finalizado de id " + registroHora.getId().toString() + " tiene algun campo Null y no se cargo ");
                    }   catch (Exception e){
                        System.out.println("Error en ReportService > getFinalizadosYProcesadosHoy " + e);
                    }
                }
        );

        return resultados;
    }

    private List<DatosExcelDto> getDatosExcelDto(List<RegistroHora> registros) {

        List<DatosExcelDto> excelDtoList = new ArrayList<>(); //Instancio la lista de registros a devolver


        //Le copio todos los datos que necesita
        for (RegistroHora rh : registros) {
            try {

                if(rh.getHorasTrabajadas() > 0.0){
                    DatosExcelDto dto = new DatosExcelDto();
                    DateFormat dmy = new SimpleDateFormat("dd/MM/yyyy");
                    dto.setClaveProyecto(rh.getFase().getProyecto().getTimesheetClaveProyecto());
                    dto.setCodigoInternoProyecto(rh.getFase().getProyecto().getTimesheetCodigoInterno());
                    dto.setCodigoFase(rh.getFase().getTimesheetCodigoFase());
                    dto.setCodigoRecurso(rh.getUsuario().getUsername());
                    dto.setLegajoRecurso(rh.getUsuario().getLegajo());
                    dto.setFechaDesde(dmy.format(new Date(rh.getInicio().getTime())));
                    dto.setFechaHasta(dmy.format(new Date(rh.getFin().getTime())));
                    dto.setHoras(String.format(Locale.US, "%.2f", rh.getHorasTrabajadas()));
                    dto.setDescripcion(rh.getDescripcion());
                    excelDtoList.add(dto);
                }
            } catch (Exception e){
                System.out.println("Error en ReportService > getDatosExcelDto " + e);
            }
        }
        return excelDtoList;
    }
}