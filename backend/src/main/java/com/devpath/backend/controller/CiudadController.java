package com.devpath.backend.controller;

import com.devpath.backend.dto.CiudadDTO;
import com.devpath.backend.entity.Ciudad;
import com.devpath.backend.repository.CiudadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ciudades")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8080"})
public class CiudadController {
    
    @Autowired
    private CiudadRepository ciudadRepository;
    
    @GetMapping
    public ResponseEntity<List<CiudadDTO>> listarCiudades() {
        List<Ciudad> ciudades = ciudadRepository.findByActivoTrue();
        
        List<CiudadDTO> ciudadesDTO = ciudades.stream()
            .map(c -> new CiudadDTO(c.getId(), c.getNombre(), c.getDepartamento()))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(ciudadesDTO);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("✅ API Ciudades funcionando correctamente!");
    }
}
