package com.auca.diacare.admin.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.auca.diacare.admin.model.Admin;
import com.auca.diacare.auth.model.User;

public interface AdminService {
    Admin registerAdmin(Admin admin);

    Optional<Admin> getAdminByPublicId(UUID publicId);

    Admin updateAdmin(UUID publicId, Admin adminDetails);

    void deleteAdmin(UUID publicId);



    void activateUser(UUID userPublicId);
}
