package com.devpath.backend.controller;

import com.devpath.backend.dto.AuthResponse;
import com.devpath.backend.dto.LoginRequest;
import com.devpath.backend.dto.RegisterRequest;
import com.devpath.backend.entity.Usuario;
import com.devpath.backend.service.AuthService;
import com.devpath.backend.config.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://pisarana.github.io"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtService jwtService;
    
    // Endpoint de registro
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error en registro: " + e.getMessage()));
        }
    }
    
    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error en login: " + e.getMessage()));
        }
    }
    
    // Endpoint para verificar token (obtener info del usuario)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extraer token del header "Bearer TOKEN"
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Token requerido");
            }
            
            String token = authHeader.substring(7);
            String email = jwtService.extractUsername(token);
            
            Usuario usuario = authService.getUserByEmail(email);
            
            return ResponseEntity.ok(new AuthResponse(token, usuario.getNombre(), usuario.getEmail()));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token inválido: " + e.getMessage());
        }
    }
    
    // Endpoint de prueba
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API Auth funcionando correctamente! 🚀");
    }
}
