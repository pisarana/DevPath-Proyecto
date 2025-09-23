package com.devpath.backend.dto;

import java.time.LocalDateTime;

public class AuthResponse {
    
    private String token;
    private String nombre;
    private String email;
    private LocalDateTime loginTime;
    private String message;
    
    // Constructores
    public AuthResponse() {}
    
    public AuthResponse(String token, String nombre, String email) {
        this.token = token;
        this.nombre = nombre;
        this.email = email;
        this.loginTime = LocalDateTime.now();
        this.message = "Login exitoso";
    }
    
    // Constructor para errores
    public AuthResponse(String message) {
        this.message = message;
        this.loginTime = LocalDateTime.now();
    }
    
    // Getters y Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public LocalDateTime getLoginTime() { return loginTime; }
    public void setLoginTime(LocalDateTime loginTime) { this.loginTime = loginTime; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    @Override
    public String toString() {
        return "AuthResponse{email='" + email + "', nombre='" + nombre + "', message='" + message + "'}";
    }
}
