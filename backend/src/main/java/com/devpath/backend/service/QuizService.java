package com.devpath.backend.service;

import com.devpath.backend.dto.QuestionDTO;
import com.devpath.backend.dto.QuizResultDTO;
import com.devpath.backend.entity.*;
import com.devpath.backend.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private TrackRepository trackRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    public List<QuestionDTO> getAllActiveQuestions() {
        List<Question> questions = questionRepository.findActiveQuestionsInOrder();
        
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<Track> getAllActiveTracks() {
        return trackRepository.findByActiveOrderByTrackKey(true);
    }
    
    public Track getTrackByKey(String trackKey) {
        return trackRepository.findByTrackKeyAndActive(trackKey, true)
                .orElseThrow(() -> new RuntimeException("Track not found: " + trackKey));
    }
    
    @Transactional
    public QuizResult saveQuizResult(QuizResultDTO dto, String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario not found"));
        
        QuizResult result = new QuizResult();
        result.setUsuario(usuario);
        result.setRecommendedTrack(dto.getRecommendedTrack());
        
        try {
            result.setScoresJson(objectMapper.writeValueAsString(dto.getScores()));
            result.setAnswersJson(objectMapper.writeValueAsString(dto.getAnswers()));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON", e);
        }
        
        return quizResultRepository.save(result);
    }
    
    public List<QuizResult> getUserResults(String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario not found"));
        
        return quizResultRepository.findByUsuarioOrderByCompletedAtDesc(usuario);
    }
    
    public QuizResult getLastUserResult(String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario not found"));
        
        return quizResultRepository.findFirstByUsuarioOrderByCompletedAtDesc(usuario)
                .orElseThrow(() -> new RuntimeException("No results found"));
    }
    
    public Map<String, Object> getQuizStatistics() {
        List<Object[]> trackStats = quizResultRepository.getTrackStatistics();
        
        Map<String, Long> trackCounts = trackStats.stream()
                .collect(Collectors.toMap(
                    row -> (String) row[0],
                    row -> (Long) row[1]
                ));
        
        long totalResults = quizResultRepository.count();
        
        return Map.of(
            "totalResults", totalResults,
            "trackDistribution", trackCounts
        );
    }
    
    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setIcon(question.getIcon());
        dto.setTitle(question.getTitle());
        dto.setQuestionOrder(question.getQuestionOrder());
        
        try {
            dto.setOptions(objectMapper.readValue(question.getOptionsJson(), 
                    objectMapper.getTypeFactory().constructCollectionType(List.class, QuestionDTO.OptionDTO.class)));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing options JSON", e);
        }
        
        return dto;
    }
}
