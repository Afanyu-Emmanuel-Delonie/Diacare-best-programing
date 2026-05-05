package com.auca.diacare.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PatientDTO {
    @NotBlank(mess)
}
