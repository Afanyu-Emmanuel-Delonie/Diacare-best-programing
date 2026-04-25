package com.auca.diacare.admin.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdminDTO {

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "User ID is required for association")
    private UUID userId;
}
