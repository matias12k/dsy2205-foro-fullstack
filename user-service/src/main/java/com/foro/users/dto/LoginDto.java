package com.foro.users.dto;
import jakarta.validation.constraints.*; import lombok.Builder;
@Builder
public record LoginDto(@NotBlank @Email String email, @NotBlank String password) {}
