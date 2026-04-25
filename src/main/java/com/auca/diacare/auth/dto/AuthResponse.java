package com.auca.diacare.auth.dto;

import com.auca.diacare.auth.model.Role;
// import lombok.AllArgsConstructor;
// import lombok.Data;

// @Data
// @AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String username;
    private Role role;

    public AuthResponse(String token, String email, String username, Role role) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
