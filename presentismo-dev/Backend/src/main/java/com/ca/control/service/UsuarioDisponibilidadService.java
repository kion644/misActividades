package com.ca.control.service;

import com.ca.control.dao.UsuarioDao;
import com.ca.control.dao.UsuarioDisponibilidadDao;
import com.ca.control.dto.AltaUsuarioDisponibilidadDto;
import com.ca.control.model.Usuario;
import com.ca.control.model.UsuarioDisponibilidad;
import com.ca.control.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.aspectj.runtime.internal.Conversions.intValue;

@Service
@Transactional
public class UsuarioDisponibilidadService {
    @Autowired
    UsuarioDisponibilidadDao usuarioDispDao;

    @Autowired
    UsuarioDao usuarioDao;






    /*public void updateUsuarioDisponibilidad(AltaUsuarioDisponibilidadDto disponibilidadDto) {
        try {
            Usuario usuario = usuarioDao.findByUsernameIgnoreCase(disponibilidadDto.getUsuario());
            Disponibilidad disponibilidad = new Disponibilidad();
            disponibilidad.setCodigo(disponibilidadDto.getDisponibilidad().getCodigo());
            disponibilidad.setDescripcion(disponibilidadDto.getDisponibilidad().getDescripcion());
            disponibilidad.setHorasSemanales(disponibilidadDto.getDisponibilidad().getHorasSemanales());
            if (!disponibilidadDao.existsDisponibilidadByCodigo(disponibilidad.getCodigo())) {
                disponibilidadDao.save(disponibilidad);
            }
            UsuarioDisponibilidad usuarioDisp = new UsuarioDisponibilidad();
            usuarioDisp.setUsuario(usuario);
            usuarioDisp.setDisponibilidad(disponibilidad);
            if (!usuarioDispDao.existsUsuarioDisponibilidadByUsuarioAndDisponibilidad(usuario, disponibilidad)) {
                usuarioDisp.setLunes(true);
                usuarioDisp.setMartes(true);
                usuarioDisp.setMiercoles(true);
                usuarioDisp.setJueves(true);
                usuarioDisp.setViernes(true);
            }else{
                usuarioDisp.setLunes(disponibilidadDto.isLunes());
                usuarioDisp.setMartes(disponibilidadDto.isMartes());
                usuarioDisp.setMiercoles(disponibilidadDto.isMiercoles());
                usuarioDisp.setJueves(disponibilidadDto.isJueves());
                usuarioDisp.setViernes(disponibilidadDto.isViernes());
            }
            usuarioDispDao.save(usuarioDisp);

        } catch (Exception e) {
            System.out.println("Error en UsuarioDisponibilidadService > updateDisponibilidadByUsuario " + e);
        }

    }*/

    public void addUsuarioDisponibilidadIfNotExist(Usuario usuario) {
        //Usuario usuario = usuarioDao.findAllById(id_usuario);
        Date newDate = new Date();
        AltaUsuarioDisponibilidadDto json = new AltaUsuarioDisponibilidadDto();
                if (!usuarioDispDao.existsByUsuarioId(usuario.getId())) {
                    UsuarioDisponibilidad usuarioDispNuevo = new UsuarioDisponibilidad();
                    usuarioDispNuevo.setId(json.getId());
                    usuarioDispNuevo.setFecha_creacion(newDate);
                    usuarioDispNuevo.setUsuario_creacion("SISTEMA");
                    usuarioDispNuevo.setHs_semanales(40);
                    usuarioDispNuevo.setHs_diarias(8.0);
                    usuarioDispNuevo.setUsuario(usuario);
                    usuarioDispNuevo.setLunes(true);
                    usuarioDispNuevo.setMartes(true);
                    usuarioDispNuevo.setMiercoles(true);
                    usuarioDispNuevo.setJueves(true);
                    usuarioDispNuevo.setViernes(true);
                    usuarioDispDao.save(usuarioDispNuevo);
                }else{
                    System.out.println("EXISTE LA DISPONIBILIDAD");
                }
    }

    public boolean modificarUsuarioDisp(AltaUsuarioDisponibilidadDto json, String token) throws Exception {
        try {
            Date newDate = new Date();
            Usuario usuario = usuarioDao.findByUsernameIgnoreCase(json.getUsuario());
            UsuarioDisponibilidad usuarioDispAEditar = new UsuarioDisponibilidad();
            //UsuarioDisponibilidad usuarioDispAEditar = usuarioDispDao.findById(Long.valueOf(json.getId())).orElseThrow(() -> new Exception("Error al editar Usuario Disponibilidad: El id ingresado no se ha encontrado"));
            usuarioDispAEditar.setUsuario(usuario);
            usuarioDispAEditar.setFecha_creacion(newDate);
            usuarioDispAEditar.setUsuario_creacion(JwtUtils.extraerUsernameDelToken(token));
            usuarioDispAEditar.setHs_diarias(json.getHs_diarias());
            usuarioDispAEditar.setLunes(json.isLunes());
            usuarioDispAEditar.setMartes(json.isMartes());
            usuarioDispAEditar.setMiercoles(json.isMiercoles());
            usuarioDispAEditar.setJueves(json.isJueves());
            usuarioDispAEditar.setViernes(json.isViernes());
            usuarioDispAEditar.setHs_semanales(getHsSemanales(usuarioDispAEditar, usuario));
            usuarioDispDao.save(usuarioDispAEditar);
            return true;
        }
        catch (Exception e) {
            throw e;
        }
    }



    public UsuarioDisponibilidad findByUsuarioId(Long id) throws Exception {
        try {

            return usuarioDispDao.findUsuarioDispByUsuarioId(id);

        } catch (Exception e) {
            throw e;
        }

    }

    public List<AltaUsuarioDisponibilidadDto> findAll() throws Exception{
        try{
            List<UsuarioDisponibilidad> lst = usuarioDispDao.getAllUsuarioDisponibilidad();

            return getAltaUsuarioDisponibilidadDto(lst);
        }
        catch (Exception e) {
            throw e;
        }
    }

    public List<AltaUsuarioDisponibilidadDto> findAllLast() throws Exception{
        try{
            List<UsuarioDisponibilidad> lst = usuarioDispDao.getAllLastUsuarioDisponibilidad();

            return getAltaUsuarioDisponibilidadDto(lst);
        }
        catch (Exception e) {
            throw e;
        }
    }

    public List<AltaUsuarioDisponibilidadDto> getAltaUsuarioDisponibilidadDto(List<UsuarioDisponibilidad> lst){
        try {

            List<AltaUsuarioDisponibilidadDto> toReturn = new ArrayList<>();
            lst.forEach(
                    (usuDispo) -> {
                        try{
                            AltaUsuarioDisponibilidadDto dto = new AltaUsuarioDisponibilidadDto(
                                    usuDispo.getId(),
                                    usuDispo.getUsuario().getUsername(),
                                    usuDispo.getHs_diarias(),
                                    usuDispo.getFecha_creacion().toString(),
                                    usuDispo.getUsuario_creacion(),
                                    usuDispo.getHs_semanales(),
                                    usuDispo.getLunes(),
                                    usuDispo.getMartes(),
                                    usuDispo.getMiercoles(),
                                    usuDispo.getJueves(),
                                    usuDispo.getViernes()

                            );
                            toReturn.add(dto);

                        }catch (Exception e){
                            System.out.println("El usuario disponibilidad de id " + usuDispo.getId() + " tiene un valor null");

                        }
                    }
            );
            return toReturn;

        }catch (Exception e) {
            System.out.println("Error en UsuarioDisponibilidadService > getAltaUsuarioDisponibilidadDto " + e);
            return null;
        }
    }

    public Integer getHsSemanales (UsuarioDisponibilidad usuDisp, Usuario usuario){
        double count = 0;
        if (usuDisp.getLunes()) {count += 1;}
        if (usuDisp.getMartes()) {count += 1;}
        if (usuDisp.getMiercoles()) {count += 1;}
        if (usuDisp.getJueves()) {count += 1;}
        if (usuDisp.getViernes()) {count += 1;}
        Double hsDiarias = usuDisp.getHs_diarias();
        int cantHs = intValue(hsDiarias * count);
        return cantHs;
    }





}
