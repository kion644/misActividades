package com.ca.control.controller;

import com.ca.control.dao.ArchivoDao;
import com.ca.control.dao.UsuarioLicenciaDao;
import com.ca.control.dto.JsonIdDto;
import com.ca.control.model.Archivo;
import com.ca.control.model.UsuarioLicencia;
import com.ca.control.service.LobService;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;



@Slf4j
@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class FileController {
    
    @Value("${urlPort}")
    private String server;

    @PersistenceContext 
    private EntityManager entityManager;

    private final ArchivoDao archivoDao;
    private final LobService lobService;

    UsuarioLicenciaDao usuarioLicenciaDao;

    @Autowired
    public FileController(ArchivoDao archivoDao, LobService lobCreator, UsuarioLicenciaDao usuarioLicenciaDao) {
        this.archivoDao = archivoDao;
        this.lobService =  lobCreator;
        this.usuarioLicenciaDao = usuarioLicenciaDao;
    }

   @Transactional
    @RequestMapping(value = "/adjunto", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> store(@RequestPart("file") MultipartFile multipartFile, @RequestParam("idUsuarioLicencia") long idUsuarioLicencia) throws IOException, SQLException, URISyntaxException {
        UsuarioLicencia usuarioLicencia = usuarioLicenciaDao.findById(idUsuarioLicencia).orElseThrow( () -> new IllegalArgumentException("No existe licencia con ese Id") );
        Session session = entityManager.unwrap(Session.class);//multipartFile.getOriginalFilename()
        Archivo adjunto = new Archivo(multipartFile.getOriginalFilename(), session.getLobHelper().createBlob(multipartFile.getInputStream(), multipartFile.getSize()), multipartFile.getContentType(), usuarioLicencia);
        if ((usuarioLicencia != null)&&(!multipartFile.isEmpty())) {
            adjunto = archivoDao.save(adjunto);
            return ResponseEntity.created(new URI(server+"adjunto/" + adjunto.getId())).build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    @RequestMapping(value = "/adjunto/{id}", method = RequestMethod.GET)
    public void load(@PathVariable("id") long id, HttpServletResponse response) throws SQLException, IOException {
        Archivo archivo = archivoDao.BuscaIdLicencia(id);
        if (archivo != null) {
            response.addHeader("Content-Disposition", "attachment; filename=" + archivo.getNombre());
            IOUtils.copy(archivo.getData().getBinaryStream(), response.getOutputStream());
        } else {
            response.sendError(400, "No Enconte Id licencia");
        }

    }


    @Transactional
    @RequestMapping(value = "/downloadFile", method = RequestMethod.POST)
    public void load(@RequestBody JsonIdDto json, HttpServletResponse response ) throws SQLException, IOException {        
        Archivo archivo = archivoDao.BuscaIdLicencia(json.getData().getId());
        if (archivo != null) {
            response.addHeader("Content-Disposition", "attachment; filename=" + archivo.getNombre());
            IOUtils.copy(archivo.getData().getBinaryStream(), response.getOutputStream());
        } else {
            response.sendError(400, "No Enconte Id licencia");
        }
    }

    @Transactional
    @RequestMapping(value = "/downloadFileToken", method = RequestMethod.POST)
    public void DownToken(@RequestBody JsonIdDto json, HttpServletResponse response) throws SQLException, IOException {
        Archivo archivo = archivoDao.BuscaIdLicencia(json.getData().getId());
            if (archivo != null) {
                response.addHeader("Content-Disposition", "attachment; filename=" + archivo.getNombre());
                IOUtils.copy(archivo.getData().getBinaryStream(), response.getOutputStream());
            } else {
                response.sendError(400, "No Enconte Id Licencia");
            }
    }


}


