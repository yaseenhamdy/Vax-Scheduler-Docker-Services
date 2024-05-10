package com.Vac.Vaccine.Vaccine.Entity;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class VaccineConfig implements WebMvcConfigurer {
 @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/vaccine/**")
            .allowedOrigins("http://localhost:3000") // Replace with the actual origin of your client application
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("Content-Type", "Authorization");
  }
}

