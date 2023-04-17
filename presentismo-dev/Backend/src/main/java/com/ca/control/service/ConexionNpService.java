
package com.ca.control.service;

import com.ca.control.utils.HttpClientAcceptSelfSignedCertificate;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;

@Service
@Transactional
public class ConexionNpService {
	
    @Value("${urlapi}")
    private String server;
    private static final String API = "getUser/";

	public String getNp(String legajo) {
		try (CloseableHttpClient httpclient = HttpClientAcceptSelfSignedCertificate.createAcceptSelfSignedCertificateClient()) {
			HttpGet httpGet = new HttpGet(server + API + legajo);
			httpGet.setHeader("Content-Type", "application/json");
			httpGet.setHeader("Accept", "*/*");
			CloseableHttpResponse response = httpclient.execute(httpGet);
			return EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8);

		} catch (Exception e) {
			System.out.println("Error en ConexionNpService > getNp " + e);
			return null;
		}
	}
}
