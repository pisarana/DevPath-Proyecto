package com.devpath.backend.dto;

import java.util.List;

public class QuestionDTO {
    private Long id;
    private String icon;
    private String title;
    private Integer questionOrder;
    private List<OptionDTO> options;
    
    // CONSTRUCTORES
    public QuestionDTO() {}
    
    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public Integer getQuestionOrder() { return questionOrder; }
    public void setQuestionOrder(Integer questionOrder) { this.questionOrder = questionOrder; }
    
    public List<OptionDTO> getOptions() { return options; }
    public void setOptions(List<OptionDTO> options) { this.options = options; }
    
    public static class OptionDTO {
        private String text;
        private Object points;
        
        public OptionDTO() {}
        
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public Object getPoints() { return points; }
        public void setPoints(Object points) { this.points = points; }
    }
}
