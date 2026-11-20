package com.foro.forum.dto;
import jakarta.validation.constraints.*; import java.util.List;
public class Dtos {
 public record CategoryDto(Long id,String nombre,String descripcion){}
 public record CommentDto(Long id,@NotBlank @Size(max=1000) String contenido,Long usuarioId,boolean oculto){}
 public record TopicDto(Long id,@NotBlank @Size(max=200) String titulo,@NotBlank @Size(max=5000) String contenido,
  @NotNull Long categoriaId,@NotNull Long usuarioId,boolean oculto,String categoriaNombre,List<CommentDto> comentarios){}
}
