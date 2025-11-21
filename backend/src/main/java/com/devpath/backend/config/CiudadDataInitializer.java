package com.devpath.backend.config;

import com.devpath.backend.entity.Ciudad;
import com.devpath.backend.repository.CiudadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@Order(1) // Se ejecuta ANTES que DataInitializer
public class CiudadDataInitializer implements CommandLineRunner {
    
    @Autowired
    private CiudadRepository ciudadRepository;
    
    @Override
    public void run(String... args) {
        if (ciudadRepository.count() == 0) {
            List<Ciudad> ciudades = Arrays.asList(
                new Ciudad(null, "Lima", "Lima", true),
                new Ciudad(null, "Arequipa", "Arequipa", true),
                new Ciudad(null, "Cusco", "Cusco", true),
                new Ciudad(null, "Trujillo", "La Libertad", true),
                new Ciudad(null, "Chiclayo", "Lambayeque", true),
                new Ciudad(null, "Piura", "Piura", true),
                new Ciudad(null, "Iquitos", "Loreto", true),
                new Ciudad(null, "Huancayo", "Junín", true),
                new Ciudad(null, "Tacna", "Tacna", true),
                new Ciudad(null, "Puno", "Puno", true),
                new Ciudad(null, "Ayacucho", "Ayacucho", true),
                new Ciudad(null, "Cajamarca", "Cajamarca", true)
            );
            
            ciudadRepository.saveAll(ciudades);
            System.out.println("✅ " + ciudades.size() + " ciudades inicializadas en H2");
        }
    }
}
