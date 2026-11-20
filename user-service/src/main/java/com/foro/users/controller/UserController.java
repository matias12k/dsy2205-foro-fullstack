package com.foro.users.controller;
import com.foro.users.dto.*; import com.foro.users.service.UserService;
import jakarta.validation.Valid; import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/usuarios") @RequiredArgsConstructor
public class UserController {
 private final UserService service;
 @GetMapping public List<UserDto> all(){return service.findAll();}
 @GetMapping("/{id}") public UserDto one(@PathVariable Long id){return service.findById(id);}
 @PostMapping public UserDto create(@Valid @RequestBody UserDto dto){return service.create(dto);}
 @PutMapping("/{id}") public UserDto update(@PathVariable Long id,@Valid @RequestBody UserDto dto){return service.update(id,dto);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){service.delete(id);}
 @PostMapping("/login") public UserDto login(@Valid @RequestBody LoginDto dto){return service.login(dto);}
}
