package com.devpath.backend.controller;

import com.devpath.backend.dto.CiudadDTO;
import com.devpath.backend.dto.ProfileResponse;
import com.devpath.backend.dto.UpdateProfileRequest;
import com.devpath.backend.entity.Ciudad;
import com.devpath.backend.entity.Usuario;
import com.devpath.backend.repository.CiudadRepository;
import com.devpath.backend.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CiudadRepository ciudadRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // GET: Obtener perfil del usuario autenticado
    @GetMapping("/perfil")
    public ResponseEntity<?> getPerfil() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Usuario usuario = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            ProfileResponse profile = new ProfileResponse(usuario);
            
            System.out.println("✅ Perfil obtenido: " + usuario.getEmail());
            
            return ResponseEntity.ok(profile);
            
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo perfil: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error al obtener perfil: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // PUT: Actualizar perfil del usuario autenticado
    @PutMapping("/perfil")
    public ResponseEntity<?> updatePerfil(@Valid @RequestBody UpdateProfileRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String emailActual = auth.getName();
            
            Usuario usuario = usuarioRepository.findByEmail(emailActual)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            System.out.println("📝 Actualizando perfil de: " + usuario.getEmail());
            
            // Validar email duplicado (si cambió)
            if (!usuario.getEmail().equals(request.getEmail())) {
                if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "El email ya está en uso");
                    return ResponseEntity.badRequest().body(error);
                }
            }
            
            // Validar DNI duplicado (si cambió)
            if (!usuario.getDni().equals(request.getDni())) {
                if (usuarioRepository.findByDni(request.getDni()).isPresent()) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "El DNI ya está en uso");
                    return ResponseEntity.badRequest().body(error);
                }
            }
            
            // Buscar ciudad
            Ciudad ciudad = ciudadRepository.findById(request.getCiudadId())
                    .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
            
            // Actualizar datos
            usuario.setNombre(request.getNombre());
            usuario.setEmail(request.getEmail());
            usuario.setDni(request.getDni());
            usuario.setCiudad(ciudad);
            
            // Actualizar contraseña solo si se proporcionó
            if (request.getNuevaPassword() != null && !request.getNuevaPassword().trim().isEmpty()) {
                if (request.getNuevaPassword().length() < 6) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "La contraseña debe tener al menos 6 caracteres");
                    return ResponseEntity.badRequest().body(error);
                }
                usuario.setPassword(passwordEncoder.encode(request.getNuevaPassword()));
                System.out.println("🔒 Contraseña actualizada");
            }
            
            usuarioRepository.save(usuario);
            
            ProfileResponse profile = new ProfileResponse(usuario);
            
            System.out.println("✅ Perfil actualizado exitosamente");
            
            return ResponseEntity.ok(profile);
            
        } catch (Exception e) {
            System.err.println("❌ Error actualizando perfil: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error al actualizar perfil: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // GET: Listar ciudades (para el combo del formulario)
    @GetMapping("/ciudades")
    public ResponseEntity<List<CiudadDTO>> getCiudades() {
        List<Ciudad> ciudades = ciudadRepository.findByActivoTrue();
        
        List<CiudadDTO> ciudadesDTO = ciudades.stream()
                .map(c -> new CiudadDTO(c.getId(), c.getNombre(), c.getDepartamento()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ciudadesDTO);
    }
}
