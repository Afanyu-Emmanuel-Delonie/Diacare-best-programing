package com.auca.diacare.admin.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.auca.diacare.admin.model.Admin;
import com.auca.diacare.admin.repository.AdminRepository;
import com.auca.diacare.auth.model.User;
import com.auca.diacare.auth.repository.UserRepository;

// import lombok.RequiredArgsConstructor;

@Service
// @RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    public AdminServiceImpl(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> getAdminByPublicId(UUID publicId) {
        return adminRepository.findByUser_PublicId(publicId);
    }

    @Override
    public Admin updateAdmin(UUID publicId, Admin adminDetails) {
        Admin admin = adminRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setDepartment(adminDetails.getDepartment());

        return adminRepository.save(admin);
    }

    @Override
    public void deleteAdmin(UUID publicId) {
        Admin admin = adminRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        adminRepository.delete(admin);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deactivateUser(UUID userPublicId) {
        User user = userRepository.findByPublicId(userPublicId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void activateUser(UUID userPublicId) {
        User user = userRepository.findByPublicId(userPublicId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(true);
        userRepository.save(user);
    }
}
