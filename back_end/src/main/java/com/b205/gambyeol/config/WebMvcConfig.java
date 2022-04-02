package com.b205.gambyeol.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration // 스프링 빈으로 등록한다.
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${access.url.location}")
    private String location;

    private final long MAX_AGE_SECS=3600;

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true)
//                .maxAge(MAX_AGE_SECS);
//    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if ("ec2".equals(location)) {
            registry.addResourceHandler("/api/starimg/**")
                    .addResourceLocations("file:///" + System.getProperty("user.dir") + File.separator + "gambyeolImg" + File.separator);
        }
        else {
            registry.addResourceHandler("/api/starimg/**")
                    .addResourceLocations("file:///" + System.getProperty("user.home") + File.separator + "gambyeolImg" + File.separator);
        }
    }


}
