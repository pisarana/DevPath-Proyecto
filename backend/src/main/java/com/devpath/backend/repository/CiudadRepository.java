package com.devpath.backend.repository;

import com.devpath.backend.entity.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {
    
    List<Ciudad> findByActivoTrue();
    
    Optional<Ciudad> findByNombre(String nombre);
}
