package com.foro.users.service;
import com.foro.users.dto.*; import com.foro.users.entity.*; import com.foro.users.mapper.UserMapper;
import com.foro.users.repository.*; import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service @RequiredArgsConstructor
public class UserService {
 private final UserRepository users; private final RoleRepository roles;
 public List<UserDto> findAll(){ return users.findAll().stream().map(UserMapper::toDto).toList(); }
 public UserDto findById(Long id){return UserMapper.toDto(users.findById(id).orElseThrow());}
 public UserDto create(UserDto dto){
  Role role=roles.findByNombre(dto.role()).orElseThrow();
  User u=User.builder().nombre(dto.nombre()).email(dto.email()).password(dto.password()).role(role).activo(dto.activo()!=null?dto.activo():true).build();
  return UserMapper.toDto(users.save(u));
 }
 public UserDto update(Long id,UserDto dto){
  User u=users.findById(id).orElseThrow();
  u.setNombre(dto.nombre()); u.setEmail(dto.email());
  if(dto.password()!=null&&!dto.password().isBlank())u.setPassword(dto.password());
  u.setActivo(dto.activo()!=null?dto.activo():u.isActivo());
  if(dto.role()!=null)u.setRole(roles.findByNombre(dto.role()).orElseThrow());
  return UserMapper.toDto(users.save(u));
 }
 public void delete(Long id){users.deleteById(id);}
 public UserDto login(LoginDto dto){User u=users.findByEmail(dto.email()).filter(x->x.isActivo()&&x.getPassword().equals(dto.password())).orElseThrow();return UserMapper.toDto(u);}
}
