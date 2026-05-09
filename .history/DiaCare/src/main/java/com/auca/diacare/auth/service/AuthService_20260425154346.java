package com.auca.diacare.auth.service;

import com.auca.diacare.auth.dto.AuthResponse;
import com.auca.diacare.auth.dto.LoginRequest;
import com.auca.diacare.auth.dto.RegisterRequest;
import com.auca.diacare.auth.model.User;
import com.auca.diacare.auth.repository.UserRepository;
import com.auca.diacare.common.util.JwtUtil;
// import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
// @RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        // 1. Check if email is already taken
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // 2. Build the user — password is hashed before saving
        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole());

        // 3. Save to DB
        userRepository.save(user);

        // 4. Generate token and return response
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.getEmail(), user.getUsername(), user.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // 2. Check if account is active
        if (!user.isActive()) {
            throw new RuntimeException("Account is deactivated");
        }

        // 3. Compare raw password against hashed password in DB
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // 4. Generate token and return response
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.getEmail(), user.getUsername(), user.getRole());
    }
}
