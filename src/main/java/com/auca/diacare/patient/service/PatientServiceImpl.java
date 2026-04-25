package com.auca.diacare.patient.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.auca.diacare.auth.model.User;
import com.auca.diacare.auth.repository.UserRepository;
import com.auca.diacare.patient.model.Patient;
import com.auca.diacare.patient.repository.PatientRepository;

// import lombok.RequiredArgsConstructor;

@Service
// @RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientServiceImpl(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Optional<Patient> getPatientByPublicId(UUID publicId) {
        return patientRepository.findByUser_PublicId(publicId);
    }

    @Override
    public Optional<Patient> getPatientByEmail(String email) {
        return patientRepository.findByUserEmail(email);
    }

    @Override
    public Patient updatePatientProfile(UUID publicId, Patient patientDetails) {
        Patient patient = patientRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patient.setDiabetesType(patientDetails.getDiabetesType());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setGender(patientDetails.getGender());
        patient.setTargetHbA1c(patientDetails.getTargetHbA1c());

        return patientRepository.save(patient);
    }

    @Override
    public void deletePatient(UUID publicId) {
        Patient patient = patientRepository.findByUser_PublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patientRepository.delete(patient);
    }
}
