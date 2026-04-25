package com.auca.diacare.doctor.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.auca.diacare.doctor.model.Doctor;
import com.auca.diacare.doctor.repository.DoctorRepository;

// import lombok.RequiredArgsConstructor;

@Service
// @RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public Optional<Doctor> getDoctorByPublicId(UUID publicId) {
        return doctorRepository.findByUser_PublicId(publicId);
    }

    @Override
    public Optional<Doctor> getDoctorByEmail(String email) {
        return doctorRepository.findByUserEmail(email);
    }

    @Override
    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    @Override
    public Doctor updateDoctorProfile(UUID publicId, Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setSpecialization(doctorDetails.getSpecialization());
        doctor.setLicenseNumber(doctorDetails.getLicenseNumber());
        doctor.setYearsOfExperience(doctorDetails.getYearsOfExperience());

        return doctorRepository.save(doctor);
    }

    @Override
    public void deleteDoctor(UUID publicId) {
        Doctor doctor = doctorRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctorRepository.delete(doctor);
    }
}
