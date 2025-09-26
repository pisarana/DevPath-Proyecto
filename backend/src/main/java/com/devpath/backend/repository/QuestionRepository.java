package com.devpath.backend.repository;

import com.devpath.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    @Query("SELECT q FROM Question q WHERE q.active = true ORDER BY q.questionOrder")
    List<Question> findActiveQuestionsInOrder();
    
    List<Question> findByActiveOrderByQuestionOrder(Boolean active);
}
