package com.devpath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tracks")
public class Track {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String trackKey;
    
    @Column(nullable = false, length = 10)
    private String icon;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(nullable = false, length = 200)
    private String description;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String details;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String technologiesJson;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String rolesJson;
    
    @Column(nullable = false)
    private Integer compatibility;
    
    @Column(nullable = false, length = 50)
    private String demand;
    
    @Column(nullable = false, length = 100)
    private String salary;
    
    @Column(nullable = false, length = 50)
    private String growth;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String companiesJson;
    
    @Column(nullable = false, length = 20)
    private String color;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    // CONSTRUCTORES
    public Track() {}
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTrackKey() { return trackKey; }
    public void setTrackKey(String trackKey) { this.trackKey = trackKey; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    
    public String getTechnologiesJson() { return technologiesJson; }
    public void setTechnologiesJson(String technologiesJson) { this.technologiesJson = technologiesJson; }
    
    public String getRolesJson() { return rolesJson; }
    public void setRolesJson(String rolesJson) { this.rolesJson = rolesJson; }
    
    public Integer getCompatibility() { return compatibility; }
    public void setCompatibility(Integer compatibility) { this.compatibility = compatibility; }
    
    public String getDemand() { return demand; }
    public void setDemand(String demand) { this.demand = demand; }
    
    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }
    
    public String getGrowth() { return growth; }
    public void setGrowth(String growth) { this.growth = growth; }
    
    public String getCompaniesJson() { return companiesJson; }
    public void setCompaniesJson(String companiesJson) { this.companiesJson = companiesJson; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
