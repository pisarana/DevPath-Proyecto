package com.devpath.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
public class QuizResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(nullable = false, length = 50)
    private String recommendedTrack;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String scoresJson;
    
    @Column(nullable = false, columnDefinition = "TEXT") 
    private String answersJson;
    
    @Column(nullable = false)
    private LocalDateTime completedAt;
    
    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }
    
    // CONSTRUCTORES
    public QuizResult() {}
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public String getRecommendedTrack() { return recommendedTrack; }
    public void setRecommendedTrack(String recommendedTrack) { this.recommendedTrack = recommendedTrack; }
    
    public String getScoresJson() { return scoresJson; }
    public void setScoresJson(String scoresJson) { this.scoresJson = scoresJson; }
    
    public String getAnswersJson() { return answersJson; }
    public void setAnswersJson(String answersJson) { this.answersJson = answersJson; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
