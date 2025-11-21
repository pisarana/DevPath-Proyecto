package com.devpath.backend.service;

import com.devpath.backend.config.JwtService;
import com.devpath.backend.dto.AuthResponse;
import com.devpath.backend.dto.LoginRequest;
import com.devpath.backend.dto.RegisterRequest;
import com.devpath.backend.entity.Ciudad;
import com.devpath.backend.entity.Usuario;
import com.devpath.backend.repository.CiudadRepository;
import com.devpath.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CiudadRepository ciudadRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        System.out.println("📝 Intento de registro: " + request);
        
        // Validar email duplicado
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse("Email ya registrado");
        }
        
        // ✨ Validar DNI duplicado
        if (usuarioRepository.findByDni(request.getDni()).isPresent()) {
            return new AuthResponse("DNI ya registrado");
        }
        
        // ✨ Buscar ciudad
        Ciudad ciudad = ciudadRepository.findById(request.getCiudadId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setNombre(request.getNombre());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setDni(request.getDni());
        usuario.setCiudad(ciudad);
        
        usuarioRepository.save(usuario);
        
        // Generar token
        String token = jwtService.generateToken(usuario);
        
        System.out.println("✅ Usuario registrado: " + usuario.getEmail() + " (DNI: " + usuario.getDni() + ", Ciudad: " + ciudad.getNombre() + ")");
        
        return new AuthResponse(token, usuario.getNombre(), usuario.getEmail());
    }
    
    // login() permanece sin cambios
    public AuthResponse login(LoginRequest request) {
        System.out.println("🔐 Intento de login: " + request.getEmail());
        
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));
        
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }
        
        String token = jwtService.generateToken(usuario);
        
        System.out.println("✅ Login exitoso: " + usuario.getEmail());
        
        return new AuthResponse(token, usuario.getNombre(), usuario.getEmail());
    }
    
    public Usuario getUserByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
