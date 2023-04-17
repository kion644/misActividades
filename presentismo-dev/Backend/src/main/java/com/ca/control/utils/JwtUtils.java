package com.ca.control.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class JwtUtils {

    private static final SignatureAlgorithm HS256 = SignatureAlgorithm.HS256;

    private static final String ALGO_NAME = HS256.getJcaName();

    private static final long EXPIRACION = 28800; //28800 segundos = 8 horas

    private static final String SECRET = "LAKEY";

    private static final String HEADER_AUTH_PREFIX = "Bearer ";

    private static final SecretKeySpec KEY_SPEC = new SecretKeySpec(DatatypeConverter.parseBase64Binary(SECRET), ALGO_NAME);

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private JwtUtils(){
    }

    public static String crearJwtToken(String username, List<String> roles){
        ZonedDateTime ahora = ZonedDateTime.now();

        return Jwts.builder()
                .setId("CDAMISA")
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(Date.from(ahora.toInstant()))
                .setExpiration(Date.from(ahora.plusSeconds(EXPIRACION).toInstant()))
                .signWith(HS256, SECRET.getBytes())
                .compact();
    }

    public static Optional<String> getTokenSinBearer(HttpServletRequest request) {
        Optional<String> token = Optional.ofNullable(request.getHeader("Authorization"));
        return getTokenSinBearer(token);
    }

    public static Optional<String> getTokenSinBearer(Optional<String> tokenConBearer){
        return tokenConBearer.map(s -> StringUtils.substring(s, HEADER_AUTH_PREFIX.length()));
    }

    public static boolean verificarToken(String token) {
        try {
            extraerClaims(token);
            return true;
        } catch (ExpiredJwtException e){

        } catch (Exception e){
            logger.error("Error en JwtUtils > verificarToken: {}", e.getMessage());
        }
            return false;
    }

    public static String extraerUsername(String token) {
        final Claims claims = extraerClaims(token);
        return claims.getSubject();
    }
    public static ArrayList extraerRol(String token){
        final Claims claims = extraerClaims(token);
        return claims.get("roles", ArrayList.class);
    }

    private static Claims extraerClaims(String token) {
        try {

            return Jwts
                    .parser()
                    .setSigningKey(SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

        } catch (ExpiredJwtException e){
            logger.info("El token esta expirado");
            throw e;
        } catch (Exception e) {
            logger.error("Error en JwtUtils > extraerClaims: {}", e.getMessage());
            throw  e;
        }
    }

    public static String getTokenSinBearer(String token) {
        return token.substring(HEADER_AUTH_PREFIX.length());
    }

    public static String extraerUsernameDelToken(String token){
        try {
            return JwtUtils.extraerUsername(JwtUtils.getTokenSinBearer(token));
        } catch (Exception e){
            logger.error("Error en JwtUtils > extraerUsernameDelToken: {}", e.getMessage());
            throw e;
        }
    }
}
