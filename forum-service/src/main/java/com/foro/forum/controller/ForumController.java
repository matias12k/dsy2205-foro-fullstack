package com.foro.forum.controller;
import com.foro.forum.dto.Dtos.*; import com.foro.forum.service.ForumService;
import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class ForumController {
 private final ForumService service;
 @GetMapping("/categorias") public List<CategoryDto> categories(){return service.categories();}
 @GetMapping("/temas") public List<TopicDto> topics(@RequestParam(required=false) String buscar){return buscar==null?service.topics():service.search(buscar);}
 @GetMapping("/temas/{id}") public TopicDto topic(@PathVariable Long id){return service.topic(id);}
 @GetMapping("/categorias/{id}/temas") public List<TopicDto> byCategory(@PathVariable Long id){return service.byCategory(id);}
 @PostMapping("/temas") public TopicDto create(@Valid @RequestBody TopicDto dto){return service.create(dto);}
 @PutMapping("/temas/{id}") public TopicDto update(@PathVariable Long id,@Valid @RequestBody TopicDto dto){return service.update(id,dto);}
 @DeleteMapping("/temas/{id}") public void delete(@PathVariable Long id){service.delete(id);}
 @PostMapping("/temas/{id}/comentarios") public CommentDto addComment(@PathVariable Long id,@Valid @RequestBody CommentDto dto){return service.addComment(id,dto);}
 @PutMapping("/comentarios/{id}") public CommentDto updateComment(@PathVariable Long id,@Valid @RequestBody CommentDto dto){return service.updateComment(id,dto);}
 @DeleteMapping("/comentarios/{id}") public void deleteComment(@PathVariable Long id){service.deleteComment(id);}
 @PatchMapping("/administracion/temas/{id}") public TopicDto moderateTopic(@PathVariable Long id,@RequestParam boolean oculto){return service.moderateTopic(id,oculto);}
 @PatchMapping("/administracion/comentarios/{id}") public CommentDto moderateComment(@PathVariable Long id,@RequestParam boolean oculto){return service.moderateComment(id,oculto);}
}
