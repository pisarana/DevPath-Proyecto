package com.devpath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ciudades")
public class Ciudad {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String nombre;
    
    @Column(length = 50)
    private String departamento;
    
    @Column(nullable = false)
    private Boolean activo = true;
    
    // CONSTRUCTORES
    public Ciudad() {}
    
    public Ciudad(Long id, String nombre, String departamento, Boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
        this.activo = activo;
    }
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }
    
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}
