package com.auca.diacare.patient.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auca.diacare.patient.dto.PatientDTO;
import com.auca.diacare.patient.model.Patient;
import com.auca.diacare.patient.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @PostMapping
    public ResponseEntity<Patient> register(@Valid @RequestBody PatientDTO dto){
        Patient patient = new Patient();
        patient.setDiabetesType(dto.getDiabetesType());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setGender(dto.getGender());
        patient.setTargetHbA1c(dto.getTargetHbA1c());
        // user will be set in the service layer after fetching the authenticated user details
        Patient registeredPatient = patientService.registerPatient(patient);
        return ResponseEntity.ok(registeredPatient);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id){
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatientProfile(@PathVariable Long id, @Valid @RequestBody PatientDTO dto){
        Patient patientDetails = new Patient();
        patientDetails.setDiabetesType(dto.getDiabetesType());
        patientDetails.setDateOfBirth(dto.getDateOfBirth());
        patientDetails.setGender(dto.getGender());
        patientDetails.setTargetHbA1c(dto.getTargetHbA1c());
        // user will not be updated here, it will be handled in the service layer
        Patient updatedPatient = patientService.updatePatientProfile(id, patientDetails);
        return ResponseEntity.ok(updatedPatient);   

        
}
