package com.devpath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 10)
    private String icon;
    
    @Column(nullable = false, length = 500)
    private String title;
    
    @Column(nullable = false)
    private Integer questionOrder;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String optionsJson;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    // CONSTRUCTORES
    public Question() {}
    
    public Question(Long id, String icon, String title, Integer questionOrder, String optionsJson, Boolean active) {
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.questionOrder = questionOrder;
        this.optionsJson = optionsJson;
        this.active = active;
    }
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public Integer getQuestionOrder() { return questionOrder; }
    public void setQuestionOrder(Integer questionOrder) { this.questionOrder = questionOrder; }
    
    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
