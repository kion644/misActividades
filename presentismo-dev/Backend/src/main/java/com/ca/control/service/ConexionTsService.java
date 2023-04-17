
package com.ca.control.service;

import com.ca.control.dto.TSProyectoDto;
import com.ca.control.dto.TsCasoNegocioDto;
import com.ca.control.dto.TsDisponibilidadDto;
import com.ca.control.utils.HttpClientAcceptSelfSignedCertificate;
import com.google.gson.Gson;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class ConexionTsService {

	//conexion para TS
	@Value("${urlTs}")
	private String serverTs;
	private static final String apiTs = "proyectoByUsuario/";
	private static final String apiDisponibilidad = "getDisponibilidad/";

	private static final String apiCNs = "casosNegocio/findAll/";
	private RestTemplate rest;
	private HttpHeaders headers;
	private HttpStatus status;

	public TSProyectoDto[] getTs(String usuario) {
		try (CloseableHttpClient httpclient = HttpClientAcceptSelfSignedCertificate
				.createAcceptSelfSignedCertificateClient()) {
			HttpGet httpGet = new HttpGet(serverTs + apiTs + usuario);
			httpGet.setHeader("Content-Type", "application/json");
			httpGet.setHeader("Accept", "*/*");
			CloseableHttpResponse response = httpclient.execute(httpGet);
			String respon = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);
			Gson JSON = new Gson();
			return JSON.fromJson(respon, TSProyectoDto[].class);

		} catch (Exception e) {
			System.out.println("Error en ConexionTsService > getTs " + e);
			return null;
		}
	}

	public TsDisponibilidadDto getDisponibilidad(String usuario) {
		try (CloseableHttpClient httpclient = HttpClientAcceptSelfSignedCertificate
				.createAcceptSelfSignedCertificateClient()) {
			HttpGet httpGet = new HttpGet(serverTs + apiDisponibilidad + usuario);
			httpGet.setHeader("Content-Type", "application/json");
			httpGet.setHeader("Accept", "*/*");
			CloseableHttpResponse response = httpclient.execute(httpGet);
			String respon = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);
			Gson JSON = new Gson();
			return JSON.fromJson(respon, TsDisponibilidadDto.class);
		} catch (Exception e) {
			System.out.println("Error en ConexionTsService > getDisponibilidad " + e);
			return null;
		}
	}

	public TsCasoNegocioDto[] getCNs(){
		try (CloseableHttpClient httpClient = HttpClientAcceptSelfSignedCertificate.createAcceptSelfSignedCertificateClient()){
			HttpGet httpGet =  new HttpGet(serverTs + apiCNs);
			httpGet.setHeader("Content-Type", "application/json");
			httpGet.setHeader("Accept", "*/*");
			CloseableHttpResponse response = httpClient.execute(httpGet);
			String respon = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);
			Gson GSON = new Gson();
			return GSON.fromJson(respon, TsCasoNegocioDto[].class);
		}catch (Exception e){
			System.out.println("Error en ConexionTsService > getCNs " + e);
			return null;
		}
	}

}
