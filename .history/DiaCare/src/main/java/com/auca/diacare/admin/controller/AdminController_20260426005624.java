package com.auca.diacare.admin.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auca.diacare.admin.dto.AdminDTO;
import com.auca.diacare.admin.model.Admin;
import com.auca.diacare.admin.service.AdminService;
import com.auca.diacare.auth.model.User;
import com.auca.diacare.auth.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin", description = "Admin profile management and user administration")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Register admin profile")
    @PostMapping
    public ResponseEntity<Admin> register(@Valid @RequestBody AdminDTO dto) {
        User user = userRepository.findByPublicId(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Admin admin = new Admin();
        admin.setUser(user);
        admin.setDepartment(dto.getDepartment());
        return ResponseEntity.ok(adminService.registerAdmin(admin));
    }

    @Operation(summary = "Get admin by public ID")
    @GetMapping("/{publicId}")
    public ResponseEntity<Admin> getByPublicId(@PathVariable UUID publicId) {
        return adminService.getAdminByPublicId(publicId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Update admin profile")
    @PutMapping("/{publicId}")
    public ResponseEntity<Admin> update(@PathVariable UUID publicId, @Valid @RequestBody AdminDTO dto) {
        Admin details = new Admin();
        details.setDepartment(dto.getDepartment());
        return ResponseEntity.ok(adminService.updateAdmin(publicId, details));
    }

    @Operation(summary = "Delete admin")
    @DeleteMapping("/{publicId}")
    public ResponseEntity<Void> delete(@PathVariable UUID publicId) {
        adminService.deleteAdmin(publicId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get admin dashboard stats")
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // User management
    @Operation(summary = "List all users")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @Operation(summary = "Deactivate a user account")
    @PutMapping("/users/{publicId}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable UUID publicId) {
        adminService.deactivateUser(publicId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Activate a user account")
    @PutMapping("/users/{publicId}/activate")
    public ResponseEntity<Void> activate(@PathVariable UUID publicId) {
        adminService.activateUser(publicId);
        return ResponseEntity.noContent().build();
    }
}
