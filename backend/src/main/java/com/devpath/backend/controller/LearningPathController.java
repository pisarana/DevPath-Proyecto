package com.devpath.backend.controller;

import com.devpath.backend.entity.LearningStep;
import com.devpath.backend.entity.Track;
import com.devpath.backend.repository.LearningStepRepository;
import com.devpath.backend.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/learning")
@CrossOrigin(
    origins = "*",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class LearningPathController {
    
    @Autowired
    private LearningStepRepository learningStepRepository;
    
    @Autowired
    private TrackRepository trackRepository;
    
    @GetMapping("/path/{trackKey}")
    public ResponseEntity<Map<String, Object>> getLearningPath(@PathVariable String trackKey) {
        try {
            System.out.println("🔍 Buscando ruta para track: " + trackKey);
            
            Track track = trackRepository.findByTrackKeyAndActive(trackKey, true)
                    .orElseThrow(() -> new RuntimeException("Track not found: " + trackKey));
            
            List<LearningStep> steps = learningStepRepository.findByTrackKeyOrderByPhase(trackKey);
            
            int totalDuration = steps.stream().mapToInt(LearningStep::getDuration).sum();
            
            System.out.println("✅ Ruta encontrada: " + track.getTitle() + " con " + steps.size() + " pasos");
            
            return ResponseEntity.ok(Map.of(
                "track", track,
                "steps", steps,
                "totalDuration", totalDuration
            ));
            
        } catch (Exception e) {
            System.err.println("❌ Error en getLearningPath: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error al cargar la ruta: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("🚀 Learning API funcionando correctamente!");
    }
    
    @GetMapping("/tracks")
    public ResponseEntity<List<String>> getAvailableTracks() {
        return ResponseEntity.ok(List.of("frontend", "backend", "fullstack", "devops", "cybersecurity", "ai_ml", "qa"));
    }
}
