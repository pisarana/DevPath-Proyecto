package com.devpath.backend.service;

import com.devpath.backend.dto.AuthResponse;
import com.devpath.backend.dto.LoginRequest;
import com.devpath.backend.dto.RegisterRequest;
import com.devpath.backend.entity.Usuario;
import com.devpath.backend.repository.UsuarioRepository;
import com.devpath.backend.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    // Registro de usuario
    public AuthResponse register(RegisterRequest request) {
        try {
            // Verificar si el usuario ya existe
            if (usuarioRepository.existsByEmail(request.getEmail())) {
                return new AuthResponse("Ya existe un usuario con este email");
            }
            
            // Crear nuevo usuario
            Usuario usuario = new Usuario(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getNombre()
            );
            
            // Guardar en BD
            Usuario usuarioGuardado = usuarioRepository.save(usuario);
            
            // Generar token JWT
            String token = jwtService.generateToken(usuarioGuardado);
            
            return new AuthResponse(token, usuarioGuardado.getNombre(), usuarioGuardado.getEmail());
            
        } catch (Exception e) {
            return new AuthResponse("Error al registrar usuario: " + e.getMessage());
        }
    }
    
    // Login de usuario
    public AuthResponse login(LoginRequest request) {
        try {
            // Buscar usuario por email
            Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            
            // Verificar password
            if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
                throw new BadCredentialsException("Credenciales incorrectas");
            }
            
            // Verificar si está activo
            if (!usuario.isActivo()) {
                return new AuthResponse("Usuario desactivado");
            }
            
            // Generar token JWT
            String token = jwtService.generateToken(usuario);
            
            return new AuthResponse(token, usuario.getNombre(), usuario.getEmail());
            
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return new AuthResponse("Credenciales incorrectas");
        } catch (Exception e) {
            return new AuthResponse("Error al iniciar sesión: " + e.getMessage());
        }
    }
    
    // Obtener info del usuario por token
    public Usuario getUserByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
    }
}
