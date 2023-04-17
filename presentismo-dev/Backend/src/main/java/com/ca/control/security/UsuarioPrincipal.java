package com.ca.control.security;

import com.ca.control.model.Rol;
import com.ca.control.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Esta clase basicamente es el usuario autenticado, que envuelve la entity de usuario real
 * Su unico uso es de SpringSecurity
 */
public class UsuarioPrincipal implements UserDetails {
    private final Usuario usuario;

    public UsuarioPrincipal(Usuario usuario) {
        this.usuario = usuario;
    }


    /**
     * Devuelve el rol dentro de un objeto SimpleGrantedAuthority de SpringSecurity
     * @return
     */
    @Override
    public Collection<GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> roles = new ArrayList<>();
        if(this.usuario.getRol() == null || this.usuario.getRol().getTipo().name().isEmpty()){
            this.usuario.setRol( new Rol());
        }

        roles.add(
                new SimpleGrantedAuthority(this.usuario.getRol().getTipo().name())
        );

        return roles;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
