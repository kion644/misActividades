package com.ca.control.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.ca.control.enums.RolInterno;
import com.ca.control.model.Rol;
import org.hibernate.result.Output;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ca.control.dao.DelegacionDao;
import com.ca.control.dao.UsuarioDao;
import com.ca.control.dto.DelegacionDto;
import com.ca.control.enums.AccionDelegadaEnum;
import com.ca.control.model.Delegacion;
import com.ca.control.model.DelegacionDestinatarios;
import com.ca.control.model.Usuario;
import com.ca.control.utils.FormatoFecha;
import com.ca.control.utils.JwtUtils;

@Service
@Transactional
public class DelegacionesService
{
    @Autowired
    DelegacionDao dao;

    @Autowired
    UsuarioDao usuarioDao;

    public List<Delegacion> findAll(String token)
    {
        Usuario usuario = usuarioDao.findByUsernameIgnoreCase(JwtUtils.extraerUsernameDelToken(token));
        return dao.getAllUsuarioCreador(usuario.getId());
    }

    public boolean create(String token, DelegacionDto dto) throws Exception
    {
        Delegacion del = new Delegacion();

        try
        {
            Delegacion delegacion = dao.existeDelegadoAndAccion(dto.getIdDelegado(),dto.getAccionDelegada());
            if (delegacion != null) {
                throw new Exception(" Ya existe el delegado que quiere asignar ");
            }
            else{
                Usuario creador = usuarioDao.findByUsernameIgnoreCase(JwtUtils.extraerUsernameDelToken(token));
                del.setUsuarioCreador(creador);
                del.setFechaCreacion(new Timestamp(FormatoFecha.getToday().getTime()));

                Usuario delegado = usuarioDao.findAllById(dto.getIdDelegado());
                del.setUsuarioDelegado(delegado);
                del.setAccion(AccionDelegadaEnum.valueOf(dto.getAccionDelegada()));

                if(delegado.getRol().getId() != 3){
                    Rol rol = new Rol();
                    rol.setId(3L) ;
                    rol.setTipo(RolInterno.LIDER);
                    delegado.setRol(rol);
                    usuarioDao.save(delegado);
                }

                List<DelegacionDestinatarios> usuarioDes = new ArrayList<>();
                DelegacionDestinatarios dest;
                for (Long id : dto.getDestinatarios())
                {
                    dest = new DelegacionDestinatarios();
                    dest.setDelegacion(del);
                    dest.setDestinatario(usuarioDao.findAllById(id));
                    usuarioDes.add(dest);
                }

                del.setUsuariosDestinatarios(usuarioDes);

                dao.save(del);
                return true;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public boolean update(String token, Long id, DelegacionDto dto)
    {
        Delegacion del = this.getUserAndValidateDelegacion(token, id);
        if (del == null)
        {
            return false;
        }

        Usuario delegado = usuarioDao.findAllById(dto.getIdDelegado());
        del.setUsuarioDelegado(delegado);
        del.setAccion(AccionDelegadaEnum.valueOf(dto.getAccionDelegada()));

        List<DelegacionDestinatarios> usuarioDes = new ArrayList<>();
        DelegacionDestinatarios dest;
        for (Long desId : dto.getDestinatarios())
        {
            if (!(del.getUsuariosDestinatarios().stream().anyMatch(x -> x.getDestinatario().getId() == desId)))
            {
                dest = new DelegacionDestinatarios();
                dest.setDelegacion(del);
                dest.setDestinatario(usuarioDao.findAllById(desId));
                usuarioDes.add(dest);
            }
        }

        del.getUsuariosDestinatarios().removeIf(x -> usuarioDes.stream().noneMatch( y -> y.getDestinatario().getId().equals(x.getDestinatario().getId())));

        del.setUsuariosDestinatarios(usuarioDes);

        dao.save(del);
        return true;
    }

    public boolean delete(String token, Long id)
    {
        Delegacion del = this.getUserAndValidateDelegacion(token, id);
        if (del == null)
        {
            return false;
        }

        dao.delete(del);
        return true;
    }

    private Delegacion getUserAndValidateDelegacion(String token, Long id)
    {
        Usuario creador = usuarioDao.findByUsernameIgnoreCase(JwtUtils.extraerUsernameDelToken(token));

        Delegacion del = dao.findAllById(id);

        if (del == null || del.getUsuarioCreador().getId() != creador.getId())
        {
            return null;
        }

        return del;
    }
}
