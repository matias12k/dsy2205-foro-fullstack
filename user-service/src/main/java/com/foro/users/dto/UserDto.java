package com.foro.users.dto;
import jakarta.validation.constraints.*; import lombok.Builder;
@Builder
public record UserDto(Long id, @NotBlank @Size(max=100) String nombre,
 @NotBlank @Email String email, @NotBlank @Size(min=8,max=20) String password,
 @NotBlank String role, Boolean activo) {}
