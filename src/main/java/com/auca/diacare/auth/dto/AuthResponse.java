package com.auca.diacare.auth.dto;

import com.auca.diacare.auth.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String username;
    private Role role;
}
