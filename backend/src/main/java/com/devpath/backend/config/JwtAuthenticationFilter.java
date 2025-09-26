package com.devpath.backend.config;

import com.devpath.backend.service.UsuarioService;
import com.devpath.backend.config.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        System.out.println("🔍 JWT Filter - Request: " + request.getRequestURI());
        System.out.println("🔍 JWT Filter - Auth Header: " + (authHeader != null ? "EXISTS" : "NULL"));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("❌ JWT Filter - No Bearer token");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(jwt);
            System.out.println("🔍 JWT Filter - Email from token: " + userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                System.out.println("🔍 JWT Filter - Loading user details for: " + userEmail);
            
                UserDetails userDetails = usuarioService.loadUserByUsername(userEmail);
                System.out.println("🔍 JWT Filter - User found: " + userDetails.getUsername());

                boolean isTokenValid = jwtService.isTokenValid(jwt, userDetails);
                System.out.println("🔍 JWT Filter - Token valid: " + isTokenValid);

                if (isTokenValid) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("✅ JWT Filter - Authentication set for: " + userEmail);
                } else {
                    System.err.println("❌ JWT Filter - Token validation failed");
                }
            }
        } catch (Exception e) {
            System.err.println("❌ JWT Filter - Exception: " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

}
