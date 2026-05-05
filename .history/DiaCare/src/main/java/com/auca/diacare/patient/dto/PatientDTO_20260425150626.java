package com.auca.diacare.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PatientDTO {
    @NotBlank(message = "Diabetes type is required")
    private String diabetesType;

    private Double targetHbA1c;

    @
}
