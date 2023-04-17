package com.cda.np;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class NpPresentismoApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(NpPresentismoApplication.class, args);
	}

	//  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	//  	return application.sources(NpPresentismoApplication.class).properties(loadproperties());

	//  }

	//  private Properties loadproperties() {
	//  	try {
	//  		Properties props = new Properties();
	//  		props.put("spring.config.location", aplicationLocation());
	//  		return props;
	//  	} catch (NamingException e) {
	//  		return null;
	//  	}
	//  }

	//  public String aplicationLocation() throws NamingException {
	//  	Context ctx = new InitialContext();
	//  	String application = (String) ctx.lookup("java:comp/env/propertiesNP");
	//  	return application;
	//  }

}
