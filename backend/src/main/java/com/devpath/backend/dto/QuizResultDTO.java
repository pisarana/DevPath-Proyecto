package com.devpath.backend.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class QuizResultDTO {
    private String userId;
    private String recommendedTrack;
    private Map<String, Integer> scores;
    private Object answers;
    private LocalDateTime completedAt;
    
    // CONSTRUCTORES
    public QuizResultDTO() {}
    
    // GETTERS Y SETTERS
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getRecommendedTrack() { return recommendedTrack; }
    public void setRecommendedTrack(String recommendedTrack) { this.recommendedTrack = recommendedTrack; }
    
    public Map<String, Integer> getScores() { return scores; }
    public void setScores(Map<String, Integer> scores) { this.scores = scores; }
    
    public Object getAnswers() { return answers; }
    public void setAnswers(Object answers) { this.answers = answers; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
