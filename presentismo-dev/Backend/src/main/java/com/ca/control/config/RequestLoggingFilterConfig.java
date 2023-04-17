package com.ca.control.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RequestLoggingFilterConfig {

    @Bean
    public CustomRequestLoggingFilter requestLoggingFilter(){

        CustomRequestLoggingFilter loggingFilter = new CustomRequestLoggingFilter();
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(false);
        loggingFilter.setAfterMessagePrefix("");
        loggingFilter.setMaxPayloadLength(20000);

        return loggingFilter;
    }

}
