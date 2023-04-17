package com.ca.control.enums;

import org.springframework.http.HttpStatus;

//FIXME Utilizar HttpStatus
@Deprecated

public enum CodigosEstadoEnum {
	
	ERROR_INICIO_MAYOR_A_FIN(409,HttpStatus.CONFLICT),
	ERROR_INTERNO(500,HttpStatus.INTERNAL_SERVER_ERROR),
	ERROR_DE_CONSULTA(400,HttpStatus.BAD_REQUEST),
	ERROR_LUGAR_DE_TRABAJO_NO_EXISTE(404,HttpStatus.NOT_FOUND), 
	ERROR_AL_ESCRIBIR_LOG(500,HttpStatus.INTERNAL_SERVER_ERROR),
        ERROR_AL_CALCULAR_HORAS(500,HttpStatus.INTERNAL_SERVER_ERROR),
	ERROR_REGISTRO_NO_ENCONTRADO(404,HttpStatus.NOT_FOUND), 
	NO_SE_ENCONTRO_REGISTRO_INICIADO(409,HttpStatus.CONFLICT), 
	OK(200,HttpStatus.OK),
	OK_CREADO(201,HttpStatus.CREATED),
	Ok_ACTUALIZADO(200,HttpStatus.OK),
	OK_SIN_REGISTROS(204,HttpStatus.OK), 
        OK_COMPLETAR_REGISTROS_ANTERIORES(204,HttpStatus.OK), 
	REGISTRO_NO_ENCONTRADO(204,HttpStatus.NOT_FOUND), 
	ERROR_ENTIDAD_NO_INICALIZADA(422,HttpStatus.UNPROCESSABLE_ENTITY),
	ERROR_REGISTRO_NO_CREADO(400,HttpStatus.BAD_REQUEST), 
	ERROR_SERVIDOR_NO_RESPONDE(404,HttpStatus.NOT_FOUND), 
	ERROR_REGISTRO_SIN_FINALIZAR(428,HttpStatus.PRECONDITION_REQUIRED),
	ERROR_USUARIO_NO_ENCONTRADO(404,HttpStatus.NOT_FOUND), 
        ERROR_CONTRASEÑA_NO_ENCONTRADA(404,HttpStatus.NOT_FOUND),
        ERROR_NO_SE_PUEDE_INICIAR_SECCION(404,HttpStatus.NOT_FOUND),
	ERROR_REGISTRO_HORA_YA_INICIADO(409,HttpStatus.CONFLICT), 
	ERROR_REGISTRO_NO_GUARDADO(409,HttpStatus.CONFLICT),
        FINALIZAR_LOGEO(403,HttpStatus.FORBIDDEN);

	private final Integer codigo;
	private HttpStatus httpStatus;

	CodigosEstadoEnum(Integer codigo,HttpStatus httpStatus) {
		this.codigo = codigo;
		this.httpStatus=httpStatus;
	}

	public int getCodigo() {
		return codigo;

	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

}
