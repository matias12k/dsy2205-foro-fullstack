package com.foro.forum.mapper;
import com.foro.forum.dto.Dtos.*; import com.foro.forum.entity.*;
import java.util.stream.Collectors;
public class ForumMapper {
 public static TopicDto toTopic(Topic t){
  return new TopicDto(t.getId(),t.getTitulo(),t.getContenido(),t.getCategory().getId(),t.getUsuarioId(),
   t.isOculto(),t.getCategory().getNombre(),t.getComments().stream().map(ForumMapper::toComment).collect(Collectors.toList()));
 }
 public static CommentDto toComment(Comment c){return new CommentDto(c.getId(),c.getContenido(),c.getUsuarioId(),c.isOculto());}
 public static CategoryDto toCategory(Category c){return new CategoryDto(c.getId(),c.getNombre(),c.getDescripcion());}
}
