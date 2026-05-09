package com.auca.diacare.patient.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
        
    }
}
