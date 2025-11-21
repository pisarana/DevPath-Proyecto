package com.devpath.backend.dto;

public class CiudadDTO {
    private Long id;
    private String nombre;
    private String departamento;
    
    // CONSTRUCTORES
    public CiudadDTO() {}
    
    public CiudadDTO(Long id, String nombre, String departamento) {
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
    }
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }
}
