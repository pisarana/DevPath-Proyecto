package com.devpath.backend.repository;

import com.devpath.backend.entity.LearningStep;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningStepRepository extends JpaRepository<LearningStep, Long> {
    
    List<LearningStep> findByTrackKeyOrderByPhase(String trackKey);
}
