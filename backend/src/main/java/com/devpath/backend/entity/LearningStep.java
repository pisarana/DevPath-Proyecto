package com.devpath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "learning_steps")
public class LearningStep {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String trackKey;
    
    @Column(nullable = false)
    private Integer phase; // 1-5
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(nullable = false, length = 300)
    private String description;
    
    @Column(nullable = false)
    private Integer duration; // semanas
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String skillsJson;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String resourcesJson;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String projectsJson;
    
    // CONSTRUCTORES
    public LearningStep() {}
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTrackKey() { return trackKey; }
    public void setTrackKey(String trackKey) { this.trackKey = trackKey; }
    
    public Integer getPhase() { return phase; }
    public void setPhase(Integer phase) { this.phase = phase; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public String getSkillsJson() { return skillsJson; }
    public void setSkillsJson(String skillsJson) { this.skillsJson = skillsJson; }
    
    public String getResourcesJson() { return resourcesJson; }
    public void setResourcesJson(String resourcesJson) { this.resourcesJson = resourcesJson; }
    
    public String getProjectsJson() { return projectsJson; }
    public void setProjectsJson(String projectsJson) { this.projectsJson = projectsJson; }
}
