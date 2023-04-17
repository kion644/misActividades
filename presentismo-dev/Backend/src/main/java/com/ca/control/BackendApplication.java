package com.ca.control;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;

import java.util.Properties;

@SpringBootApplication
@PropertySource("file:${BACKEND_CONFIG_LOCATION}/application.properties")
public class BackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(BackendApplication.class);


		Properties properties = new Properties();
		properties.put("spring.config.location", System.getenv("BACKEND_CONFIG_LOCATION"));
		application.setDefaultProperties(properties);

		application.run(args);
	}
}
