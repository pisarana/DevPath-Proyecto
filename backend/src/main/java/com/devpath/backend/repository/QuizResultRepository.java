
package com.devpath.backend.repository;

import com.devpath.backend.entity.QuizResult;
import com.devpath.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    List<QuizResult> findByUsuarioOrderByCompletedAtDesc(Usuario usuario);
    
    Optional<QuizResult> findFirstByUsuarioOrderByCompletedAtDesc(Usuario usuario);
    
    @Query("SELECT qr FROM QuizResult qr WHERE qr.recommendedTrack = :track ORDER BY qr.completedAt DESC")
    List<QuizResult> findByRecommendedTrack(String track);
    
    @Query("SELECT qr.recommendedTrack, COUNT(qr) FROM QuizResult qr GROUP BY qr.recommendedTrack")
    List<Object[]> getTrackStatistics();
}
