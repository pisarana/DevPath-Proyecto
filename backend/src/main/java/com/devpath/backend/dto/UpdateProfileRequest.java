package com.devpath.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {
    
    @NotBlank(message = "Nombre es obligatorio")
    @Size(min = 2, max = 50, message = "Nombre debe tener entre 2 y 50 caracteres")
    private String nombre;
    
    @Email(message = "Email debe tener formato válido")
    @NotBlank(message = "Email es obligatorio")
    private String email;
    
    @NotBlank(message = "DNI es obligatorio")
    @Pattern(regexp = "^[0-9]{8}$", message = "DNI debe tener exactamente 8 dígitos")
    private String dni;
    
    @NotNull(message = "Ciudad es obligatoria")
    private Long ciudadId;
    
    // Contraseña opcional (solo si quiere cambiarla)
    private String nuevaPassword;
    
    // Constructores
    public UpdateProfileRequest() {}
    
    public UpdateProfileRequest(String nombre, String email, String dni, Long ciudadId) {
        this.nombre = nombre;
        this.email = email;
        this.dni = dni;
        this.ciudadId = ciudadId;
    }
    
    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    
    public Long getCiudadId() { return ciudadId; }
    public void setCiudadId(Long ciudadId) { this.ciudadId = ciudadId; }
    
    public String getNuevaPassword() { return nuevaPassword; }
    public void setNuevaPassword(String nuevaPassword) { this.nuevaPassword = nuevaPassword; }
}
