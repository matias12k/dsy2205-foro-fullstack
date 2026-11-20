package com.foro.users.mapper;
import com.foro.users.dto.UserDto; import com.foro.users.entity.User;
public class UserMapper {
 public static UserDto toDto(User u) { return UserDto.builder().id(u.getId()).nombre(u.getNombre()).email(u.getEmail())
  .role(u.getRole().getNombre()).activo(u.isActivo()).build(); }
}
