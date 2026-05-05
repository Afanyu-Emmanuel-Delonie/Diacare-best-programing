package com.auca.diacare.patient.service;

import com.auca.diacare.patient.model.Patient;

public interface PatientService {
    Patient registerPatient(Patient patient);
    Optional<Patient> getPatientById(Long id);
    Patient updatePatientProfile(Long id, Patient patientDetails);
}
