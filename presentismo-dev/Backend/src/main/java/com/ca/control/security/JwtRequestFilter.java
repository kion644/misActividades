package com.ca.control.security;

import com.ca.control.service.UsuarioService;
import com.ca.control.utils.JwtUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UsuarioService usuarioService;

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Optional<String> token = JwtUtils.getTokenSinBearer(request);
            token.ifPresent(t -> verificarYAutenticarUsuario(request, t));
        } catch (Exception e){
            System.out.println("Error en JwtRequestFilter > doFilterInternal " + e);
        }

        filterChain.doFilter(request, response);
    }

    private void verificarYAutenticarUsuario(HttpServletRequest request, String token){
        try {
            if (JwtUtils.verificarToken(token)){
                String username = JwtUtils.extraerUsername(token);
                UsuarioPrincipal principal = (UsuarioPrincipal) usuarioService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (ExpiredJwtException e){
            logger.info("El usuario ha intentado acceder con un token expirado");
        } catch (Exception e){
            logger.error("Error en JwtRequestFilter > verificarYAutenticarUsuario: {}", e.getMessage());
        }
    }
}
