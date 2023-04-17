package com.ca.control.service;

import com.ca.control.dao.RolDao;
import com.ca.control.dao.UsuarioDao;
import com.ca.control.dto.*;
import com.ca.control.model.Rol;
import com.ca.control.model.Usuario;
import com.ca.control.security.UsuarioPrincipal;
import com.ca.control.utils.JwtUtils;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.ldap.AuthenticationException;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.ldap.filter.Filter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.ldap.SpringSecurityLdapTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import java.util.stream.Collectors;


@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    UsuarioDao usuarioDao;

    @Autowired
    ConexionNpService conexionNpService;

    @Autowired
    ConexionTsService conexionTsService;

    @Autowired
    DatosTsService datosTsService;

    @Autowired
    RolDao rolDao;

    @Autowired
    UsuarioDisponibilidadService usuarioDispService;

    private static final String DOMAIN_CONTROLLER = "ldap://cda-ar-dc-001:3268";
    private static final String DOMINIO_CDA = "@cdainfo.com";
    private static final String BASE = "DC=cdainfo,DC=local";
    private static final String USER_DN = "CN=cda skill,OU=Usuarios de Servicio,OU=Argentina,OU=CDA,DC=cdainfo,DC=local";
    private static final String PWD = "*ME94@h4fqH@";
    private LdapContextSource contextSource;

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    public Usuario getUsuarioByToken(String token){

        return usuarioDao.findByUsernameIgnoreCase(JwtUtils.extraerUsername(token));
    }
    public Usuario findById(Integer id) throws Exception {
        try {
            return usuarioDao.findById(Long.valueOf(id)).orElseThrow(
                () -> new Exception("El usuario con el id ingresado no se ha encontrado"));
        } catch (Exception e) {
            throw e;
        }
    }

    public List<LideresResponse> getAllLideres(){
        try {
            List<Usuario> lst = usuarioDao.findAllLideres();
            return getLideresResponseLst(lst);
        } catch (Exception e){
            logger.error("Error en UsuarioService> getAllLideres: {}", e.getMessage());
            throw e;
        }
    }

    public List<LideresResponse> getLideresResponseLst(List<Usuario> lst) {
        try {
            List<LideresResponse> toReturn = new ArrayList<>();
            lst.forEach(
                    (lider) -> {
                        try {
                            LideresResponse dto = new LideresResponse();
                            dto.setUsername(lider.getApellidoYNombre());
                            dto.setId(lider.getId());

                            toReturn.add(dto);
                        } catch (Exception e) {
                            logger.error("El lider de id {} tiene un valor null", lider.getId());
                        }
                    });
            return toReturn;

        } catch (Exception e) {
            logger.error("Error en ComboService > getLideresResponse: {}", e.getMessage());
            return null;
        }
    }
    public List<Usuario> getAllUsuario(){

            List<Usuario> lst = usuarioDao.getAllUsuario();
            return lst;
    }


    public Usuario getUsuarioByBearerToken(String tokenConBearer){
        return usuarioDao.findAllByUsernameIgnoreCase(JwtUtils.extraerUsernameDelToken(tokenConBearer));
    }

    public Usuario findByUsername(String username){
        return usuarioDao.findByUsernameIgnoreCase(username);
    }

    public List<Usuario> findDistinctUsuarioByLider(Long id){
        return usuarioDao.findDistinctUsuarioByLider(id);
    }

    public Iterable<Usuario> findAll(){
        return usuarioDao.findAll();
    }

    /**
     * Este metodo se encarga de prepararme el contextSource
     */
    @PostConstruct
    private void prepararContextoLdap(){
        LdapContextSource localcontext = new LdapContextSource();
        localcontext.setUrl(DOMAIN_CONTROLLER);
        localcontext.setUserDn(USER_DN);
        localcontext.setBase(BASE);
        localcontext.setPassword(PWD);
        localcontext.afterPropertiesSet();

        this.contextSource = localcontext;
    }

    /**
     *
     * Este metodo me carga la informacion de seguridad del usuario en un objeto
     * @param usuario
     * @return
     * @throws UsernameNotFoundException
     */

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        try {

            Usuario userObj = usuarioDao.findByUsernameIgnoreCase(usuario);
            return new UsuarioPrincipal(userObj);

        } catch (IncorrectResultSizeDataAccessException e){
            System.out.println("Error en UsuarioService > loadUserByUsername para el usuario: " + usuario);
            if (e.getActualSize() == 0){
                throw new UsernameNotFoundException("El usuario " + usuario + " no fue encontrado");
            } else {
                throw e;
            }
        }
    }

    /**
     * Este metodo se encarga de buscar el usuario en la DB, y si no existe, me lo crea y me lo devuelve
     * @param usuario
     * @return
     */
    private Usuario getUsuario(String usuario, String legajo) throws Exception {
        Usuario userObj;

        //Si tiene legajo simplemente recupero el usuario
        if (usuarioDao.existsByLegajo(legajo)){
            userObj = usuarioDao.findByLegajo(legajo);
        }
        //Si no tiene legajo pero el usuario esta creado
        else if (usuarioDao.existsByUsernameIgnoreCase(usuario)){
            //Lo busco y le seteo el legajo
            userObj = usuarioDao.findAllByUsernameIgnoreCase(usuario);
            userObj.setLegajo(legajo);
        }
        //Si el usuario no existe..
        else {
            //Lo creo y le seteo el usuario y mail
            userObj = new Usuario();
            userObj.setUsername(usuario);
            userObj.setEmail(normalizarEmail(usuario));

            /*
            Actualmente no hay ninguna logica de seteo de rol. Simplemente se setea el rol común a todos los
            usuarios y en la base de datos se modifica según corresponda.
            */
            Rol rolComun = rolDao.findById(2L).orElseThrow( () -> new IllegalArgumentException("No existe rol con ese id"));
            userObj.setRol(rolComun);
        }

        /*
        Independientemente de si existe o no, accedo a Timesheet y a Np para
        actualizar los datos que le corresponden
         */
        try {
            //Accedo a Np y me parseo sus resultados a un Json
            String resultadosNp = conexionNpService.getNp(legajo);
            Gson gson = new Gson();
            NpResponse jsonNp = gson.fromJson(resultadosNp, NpResponse.class);

            //Verificación de datos de NP
            Objects.requireNonNull(jsonNp.getLegajo(), "No se obtuvo el legajo desde NP");
            Objects.requireNonNull(jsonNp.getLegajoLider(), "No se obtuvo el legajo del líder desde NP");
            Objects.requireNonNull(jsonNp.getTernro(), "No se obtuvo el TerNro desde NP");
            Objects.requireNonNull(jsonNp.getApellido(), "No se obtuvo el apellido desde NP");
            Objects.requireNonNull(jsonNp.getNombre(), "No se obtuvo el nombre desde NP");

            //Asigno todos los datos de Np al usuario
            userObj.setApellido(jsonNp.getApellido());
            userObj.setNombre(jsonNp.getNombre());
            userObj.setLegajo(jsonNp.getLegajo());
            userObj.setTernroNP(jsonNp.getTernro());





            //Si el lider no existe, lo creo
            crearLiderSiNoExiste(jsonNp);

            userObj.setLider(usuarioDao.findByLegajo(jsonNp.getLegajoLider()));
        } catch (Exception e){
            System.out.println("Error obteniendo datos de NP: " + e.getMessage());
            throw new Exception("Error obteniendo datos de NP para el usuario: " + userObj.getUsername() + ": " + e.getMessage());
        }

        /*
            Actualmente, no se esta seteando el lider de Np y se esta hardcodeando el lider
            Cuando se implemente, reemplazar la linea debajo con la linea comentada
            userObj.setLider(usuarioDao.findByLegajo("54100817"));

        /*
        Guardo el usuario ahora porque los metodos que actualizan la informacion
        de Timesheet ya lo hacen por su cuenta
         */

        usuarioDispService.addUsuarioDisponibilidadIfNotExist(userObj);



        try{
            //Accedo a TimeSheet y le asigno sus proyectos y fases
            TSProyectoDto[] resultadosTs = conexionTsService.getTs(usuario);
            datosTsService.updateProyectByUsuario(resultadosTs, userObj);
        } catch (Exception e){
            System.out.println("Error guardando datos de TimeSheet en UsuarioService " + e);
            throw new Exception("Error obteniendo datos de TimeSheet para el usuario: " + userObj.getUsername());
        }

        usuarioDao.save(userObj);
        //Finalmente recupero el usuario una vez mas luego de ser actualizado con los datos de TS
        return usuarioDao.findByUsername(usuario);
    }

    /**
     * Este metodo genera la response que se envia al front, con el JWT.
     */
    public AuthResponse getJwt(AuthRequest request) throws Exception {
        try {
            //Llamo al metodo que va a AD a autenticarEnAd
            boolean authed = autenticarEnAd(request.getUsername(), request.getPassword());
     
            if(request.getPassword().isEmpty() || request.getPassword() == null){
                throw new AuthenticationException();
            }
            
            //Si esta autenticado..
            if(authed){
                //Normalizo el usuario...
                String username = normalizarUsuario(request.getUsername());
                //Me traigo su legajo de Ad
                String legajo = this.getLegajo(username);
                if(legajo == null || legajo.isEmpty()){
                    throw new Exception("No se ha podido obtener el legajo desde Active Directory");
                }
                //Se lo paso al metodo que crea el usuario (Este metodo va a NP y TimeSheet)
                Usuario userObj = getUsuario(username, legajo);

                //Instancio el Principal que envuelve al usuario
                UsuarioPrincipal usuarioPrincipal = new UsuarioPrincipal(userObj);
                //Me guardo los roles de ese usuario contenido en el Principal en una Autenticacion
                Authentication authentication = new UsernamePasswordAuthenticationToken(usuarioPrincipal, null, usuarioPrincipal.getAuthorities());
                //Le digo a SpringSecurity que ese usuario se autentico con esos roles
                SecurityContextHolder.getContext().setAuthentication(authentication);

                List<String> roles = usuarioPrincipal.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());

                //Le devuelvo el token, el username y los roles
                return new AuthResponse(
                        JwtUtils.crearJwtToken(username, roles),
                        username,
                        userObj.getNombre(),
                        userObj.getApellido(),
                        roles
                );
            }
            else{
            throw new AuthenticationException();
            }
        }
        catch (Exception e){
            System.out.println("Error en UsuarioService > getJwt " + e);
            throw e;
        }
    }

    /**
     * Este metodo se encarga de buscar el numero de legajo en Ad
     * @param usuario
     * @return
     */
    private String getLegajo(String usuario){
        try {
            //Configuro el contexto y los controles de búsqueda
            SearchControls controls = new SearchControls();
            controls.setSearchScope(SearchControls.SUBTREE_SCOPE);
            Properties props = new Properties();
            props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
            props.put(Context.PROVIDER_URL, DOMAIN_CONTROLLER);
            props.put(Context.SECURITY_PRINCIPAL, USER_DN);
            props.put(Context.SECURITY_CREDENTIALS, PWD);
            DirContext context = new InitialDirContext(props);

            //Hago la query
            NamingEnumeration<SearchResult> result = context.search(BASE, "sAMAccountName=" + usuario, controls);

            //Si el resultado no esta vacio..
            if (result.hasMore()) {
                //Asigno el legajo a la variable, y lo recorto para quedarme solo con el numero
                Attributes attrs = result.next().getAttributes();
                String legajo = attrs
                        .get("pager")
                        .toString()
                        .replaceAll("\\s", "");
                return legajo.substring(legajo.indexOf(":") + 1);
            }

            logger.error("No se encontro legajo para el usuario {}", usuario);
            throw new IncorrectResultSizeDataAccessException(0);
        } catch (Exception e){
            return null;
        }
    }

    /**
     * Este metodo se encarga de autenticar al usuario comparando la password con la de Ad
     * Me devuelve un boolean indicando si fue autenticado o no
     * @param usuario
     * @param password
     * @return
     */
    private boolean autenticarEnAd(String usuario, String password){
        try {
            //Le saco el dominio si lo tiene
            String username = normalizarUsuario(usuario);

            //Ob
            SpringSecurityLdapTemplate template = new SpringSecurityLdapTemplate(this.contextSource);
            Filter filtro = new EqualsFilter("sAMAccountName", username);

            boolean isAuthenticated = template.authenticate("", filtro.encode(), password);

            if(!isAuthenticated){
                throw new AuthenticationException();
            }
            else{
                return isAuthenticated;
            }
        } catch (Exception e){
            System.out.println("Error en UsuarioService > autenticarEnAd " + e);
            return false;
        }
    }

    /**
     * Este metodo le recorta el dominio de email ( @cdainfo.com ) al usuario, si es que lo tiene
     * @param usuario
     * @return
     */
    private String normalizarUsuario(String usuario){
        if (usuario.contains("@")) {
            String[] parts = usuario.split("@");
            usuario = parts[0];
        }
        return usuario;
    }

    private String normalizarEmail (String email){
        if (!email.contains(DOMINIO_CDA)) {
        } else {
            return email;
        }
        return (email + DOMINIO_CDA);
    }

    /**
     * Este metodo me crea el lider si es que no existe
     * @param json
     */
    private void crearLiderSiNoExiste(NpResponse json){
        if (usuarioDao.findByLegajo(json.getLegajoLider()) == null) {
            Usuario lider = new Usuario();
            lider.setNombre(json.getNombreLider());
            lider.setTernroNP(json.getTernroLider());
            lider.setLegajo(json.getLegajoLider());
            lider.setApellido(json.getApellidoLider());
            usuarioDao.save(lider);
        }
    }



    public AuthResponse autenticarDeveloper(AuthRequest request){
        if (request.getPassword().equals("123")){
            //Busco el usuario directamente, no actualizo ni Active Directory ni TimeSheet ni Np
            Usuario userObj = usuarioDao.findByUsername(request.getUsername());

            if(userObj == null) throw new UsernameNotFoundException("No se encontro al usuario " + request.getUsername());

            //Instancio el Principal que envuelve al usuario
            UsuarioPrincipal usuarioPrincipal = new UsuarioPrincipal(userObj);
            //Me guardo los roles de ese usuario contenido en el Principal en una Autenticacion
            Authentication authentication = new UsernamePasswordAuthenticationToken(usuarioPrincipal, null, usuarioPrincipal.getAuthorities());
            //Le digo a SpringSecurity que ese usuario se autentico con esos roles
            SecurityContextHolder.getContext().setAuthentication(authentication);

            List<String> roles = usuarioPrincipal.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            //Le devuelvo el token, el username y los roles
            return new AuthResponse(
                    JwtUtils.crearJwtToken(request.getUsername(), roles),
                    request.getUsername(),
                    userObj.getNombre(),
                    userObj.getApellido(),
                    roles
            );
        } else {
            throw new AuthenticationException();
        }
    }

    public Boolean existsByUsernameIgnoreCase(String user) {
        return usuarioDao.existsByUsernameIgnoreCase(user);
    }
}
