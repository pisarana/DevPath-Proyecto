package com.devpath.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    
    @NotBlank(message = "Nombre es obligatorio")
    @Size(min = 2, max = 50, message = "Nombre debe tener entre 2 y 50 caracteres")
    private String nombre;
    
    @Email(message = "Email debe tener formato válido")  
    @NotBlank(message = "Email es obligatorio")
    private String email;
    
    @NotBlank(message = "Password es obligatorio")
    @Size(min = 6, max = 100, message = "Password debe tener entre 6 y 100 caracteres")
    private String password;
    
    // Constructores
    public RegisterRequest() {}
    
    public RegisterRequest(String nombre, String email, String password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
    
    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    @Override
    public String toString() {
        return "RegisterRequest{nombre='" + nombre + "', email='" + email + "'}";
    }
}
