package com.devpath.backend.dto;

import com.devpath.backend.entity.Usuario;
import java.time.LocalDateTime;

public class ProfileResponse {
    private Long id;
    private String nombre;
    private String email;
    private String dni;
    private Long ciudadId;
    private String ciudadNombre;
    private String ciudadDepartamento;
    private LocalDateTime fechaRegistro;
    
    // Constructor desde Usuario
    public ProfileResponse(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.email = usuario.getEmail();
        this.dni = usuario.getDni();
        this.ciudadId = usuario.getCiudad().getId();
        this.ciudadNombre = usuario.getCiudad().getNombre();
        this.ciudadDepartamento = usuario.getCiudad().getDepartamento();
        this.fechaRegistro = usuario.getFechaRegistro();
    }
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    
    public Long getCiudadId() { return ciudadId; }
    public void setCiudadId(Long ciudadId) { this.ciudadId = ciudadId; }
    
    public String getCiudadNombre() { return ciudadNombre; }
    public void setCiudadNombre(String ciudadNombre) { this.ciudadNombre = ciudadNombre; }
    
    public String getCiudadDepartamento() { return ciudadDepartamento; }
    public void setCiudadDepartamento(String ciudadDepartamento) { this.ciudadDepartamento = ciudadDepartamento; }
    
    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}
