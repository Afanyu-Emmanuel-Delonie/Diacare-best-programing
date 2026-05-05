package com.auca.diacare.patient.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientDTO {
    @NotBlank(message = "Diabetes type is required")
    private String diabetesType;

    private Double targetHbA1c;

    @NotNull(message = "User ID is required")
    private 
}
