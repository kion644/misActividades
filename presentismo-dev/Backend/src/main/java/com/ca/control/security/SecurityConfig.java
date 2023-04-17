package com.ca.control.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.ca.control.enums.RolInterno.*;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                    .antMatchers("/auth", "/auth/developer").permitAll()
                    //Esto solo para lideres
                    .antMatchers(
                            "/exportExcelRegistro",
                            "/licenciasPendientesLider",
                            "/aceptacionLicenciaLider",
                            "/listaLicenciaEjecutadas",
                            "/listaLicenciasActivas")
                        .hasAnyAuthority(LIDER.name(), ASISTENCIA_ADMINISTRATIVA.name())
                    //Esto solo para atencion
                    .antMatchers(
                            "/licenciasPendientesAtencion",
                            "/aceptacionLicenciaAtencion",
                            "/listaAtencionTomada",
                            "/listaAtencionEjecutada",
                            "/tomaLicenciaAtencion",
                            "/licencias/tomadas")
                        .hasAuthority(ATENCION.name())
                    //Esto para lideres o atencion
                    .antMatchers().hasAnyAuthority(ATENCION.name(), LIDER.name())
                    //Esto para cualquier otra persona que este logueada
                    .anyRequest().fullyAuthenticated()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .logout().disable()
                    .formLogin().disable()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());

        //Agrego el filtro de token JWT
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
