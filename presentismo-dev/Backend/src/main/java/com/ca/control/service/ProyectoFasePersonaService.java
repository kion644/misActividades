package com.ca.control.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import com.ca.control.dao.FaseDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dao.ProyectoFasePersonaDao;
import com.ca.control.dao.UsuarioDao;
import com.ca.control.dto.AgregarPersonaAFaseDto;
import com.ca.control.dto.PersonaFaseDto;
import com.ca.control.model.Fase;
import com.ca.control.model.Proyecto;
import com.ca.control.model.ProyectoFasePersona;
import com.ca.control.model.Usuario;

@Service
public class ProyectoFasePersonaService {
    @Autowired ProyectoFasePersonaDao pfpDao;
	@Autowired ProyectoDao pDao;
	@Autowired UsuarioDao userDao;
	@Autowired FaseDao faseDao;
    private static final Logger logger = LoggerFactory.getLogger
    (ProyectoFasePersonaService.class);

    public List<PersonaFaseDto> findAllPersonByFaseId(Long id) {
			List<ProyectoFasePersona> lst = pfpDao.getAllByFaseId(id);
			return setPersonaFaseDto(lst);
    }

    private List<PersonaFaseDto> setPersonaFaseDto(List<ProyectoFasePersona> lst) {
	        List<PersonaFaseDto> toReturn = new ArrayList<>();
	        lst.forEach (
		           (proyectoFasePersona) -> {
		           	
		           		PersonaFaseDto dto = new PersonaFaseDto();
						dto.setId(proyectoFasePersona.getId());
		           		dto.setNombre(proyectoFasePersona.getUserPersona().getNombre());
                        dto.setApellido(proyectoFasePersona.getUserPersona().getApellido());
                        dto.setUsuario(proyectoFasePersona.getUserPersona().getUsername());
                        dto.setLider(proyectoFasePersona.getUserPersona().getLider().getApellidoYNombre());
		           		toReturn.add(dto);
		           	
		});
		return toReturn;
 }
public boolean addPerson(AgregarPersonaAFaseDto dto)
{
        
	{
		ProyectoFasePersona pfp = new ProyectoFasePersona();
		Proyecto pp = pDao.getById(dto.getProyectoId());
		Usuario user = userDao.getById(dto.getUserId());
		Fase fase = faseDao.getById(dto.getFaseId());
		pfp.setProyecto(pp);
		pfp.setUserPersona(user);
		pfp.setFase(fase);
		pfp.sethabilitado(true);
		pfpDao.save(pfp);
		return true;
	}
}
public boolean deletePerson(Integer id) throws Exception {
	try {
		ProyectoFasePersona personaABorrar = pfpDao.findById(Long.valueOf(id)).orElseThrow(
				() -> new Exception("Error al borrar persona: No se encontró ninguna persona con este Id"));
		pfpDao.deleteById(Long.valueOf(personaABorrar.getId()));
		return true;
	} catch (Exception e) {
		throw e;
	}
}

}
