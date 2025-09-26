package com.devpath.backend.controller;

import com.devpath.backend.dto.QuestionDTO;
import com.devpath.backend.dto.QuizResultDTO;
import com.devpath.backend.entity.QuizResult;
import com.devpath.backend.entity.Track;
import com.devpath.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = {"http://localhost:3000","https://pisarana.github.io", "http://127.0.0.1:3000", "http://localhost:8080"})
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions() {
        List<QuestionDTO> questions = quizService.getAllActiveQuestions();
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getTracks() {
        List<Track> tracks = quizService.getAllActiveTracks();
        return ResponseEntity.ok(tracks);
    }
    
    @GetMapping("/tracks/{trackKey}")
    public ResponseEntity<Track> getTrack(@PathVariable String trackKey) {
        Track track = quizService.getTrackByKey(trackKey);
        return ResponseEntity.ok(track);
    }
    @PostMapping("/result")
    public ResponseEntity<Map<String, Object>> saveResult(
            @RequestBody QuizResultDTO resultDTO,
            Authentication authentication) {
    
        System.out.println("🔍 POST /quiz/result - Iniciado");
        System.out.println("🔍 Authentication: " + authentication);
        System.out.println("🔍 Auth class: " + (authentication != null ? authentication.getClass().getSimpleName() : "NULL"));
    
        if (authentication != null) {
            System.out.println("🔍 Auth name: " + authentication.getName());
            System.out.println("🔍 Auth principal: " + authentication.getPrincipal());
            System.out.println("🔍 Auth authenticated: " + authentication.isAuthenticated());
        }
    
        try {
            if (authentication == null) {
                System.err.println("❌ Authentication is NULL");
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "error", "Usuario no autenticado"
                ));
            }
        
            String userEmail = authentication.getName();
            System.out.println("✅ Email extraído: " + userEmail);
        
            QuizResult savedResult = quizService.saveQuizResult(resultDTO, userEmail);
            System.out.println("✅ Resultado guardado con ID: " + savedResult.getId());

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Resultado guardado correctamente",
                "resultId", savedResult.getId()
            ));

        } catch (Exception e) {
            System.err.println("❌ Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }



    
    @GetMapping("/my-results")
    public ResponseEntity<List<QuizResult>> getMyResults(Authentication authentication) {
        String userEmail = authentication.getName();
        List<QuizResult> results = quizService.getUserResults(userEmail);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/my-last-result")
    public ResponseEntity<QuizResult> getMyLastResult(Authentication authentication) {
        String userEmail = authentication.getName();
        QuizResult result = quizService.getLastUserResult(userEmail);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = quizService.getQuizStatistics();
        return ResponseEntity.ok(stats);
    }
}
