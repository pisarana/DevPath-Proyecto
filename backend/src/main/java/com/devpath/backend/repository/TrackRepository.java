package com.devpath.backend.repository;

import com.devpath.backend.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    
    Optional<Track> findByTrackKeyAndActive(String trackKey, Boolean active);
    
    List<Track> findByActiveOrderByTrackKey(Boolean active);
}
