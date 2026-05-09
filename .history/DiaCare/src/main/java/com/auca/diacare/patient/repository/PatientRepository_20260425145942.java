package com.auca.diacare.patient.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auca.diacare.patient.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    // finding patients by id, email, or username or dibetes type
    Optional<Patient> findById(Long id);
    Optional<Patient> findByUserEmail(String email);
    Optional<Patient> findByUserUsername(String username);

    
    
 
}
