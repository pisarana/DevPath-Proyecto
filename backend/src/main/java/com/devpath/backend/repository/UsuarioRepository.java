package com.devpath.backend.repository;

import com.devpath.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar usuario por email
    Optional<Usuario> findByEmail(String email);
    
    // Verificar si existe usuario con ese email
    boolean existsByEmail(String email);
    
    // Buscar usuario por email ignorando mayúsculas
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.email) = LOWER(?1)")
    Optional<Usuario> findByEmailIgnoreCase(String email);
    
    // Contar usuarios activos
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.activo = true")
    long countActiveUsers();
}
