package com.foro.forum.service;
import com.foro.forum.dto.Dtos.*; import com.foro.forum.entity.*; import com.foro.forum.mapper.ForumMapper;
import com.foro.forum.repository.Repositories.*; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service;
import java.util.List;
@Service @RequiredArgsConstructor
public class ForumService {
 private final TopicRepository topics; private final CommentRepository comments; private final CategoryRepository categories;
 public List<CategoryDto> categories(){return categories.findAll().stream().map(ForumMapper::toCategory).toList();}
 public List<TopicDto> topics(){return topics.findAll().stream().map(ForumMapper::toTopic).toList();}
 public TopicDto topic(Long id){return ForumMapper.toTopic(topics.findById(id).orElseThrow());}
 public List<TopicDto> byCategory(Long id){return topics.findByCategoryId(id).stream().map(ForumMapper::toTopic).toList();}
 public List<TopicDto> search(String q){return topics.findByTituloContainingIgnoreCase(q).stream().map(ForumMapper::toTopic).toList();}
 public TopicDto create(TopicDto dto){
  Category c=categories.findById(dto.categoriaId()).orElseThrow();
  Topic t=Topic.builder().titulo(dto.titulo()).contenido(dto.contenido()).category(c).usuarioId(dto.usuarioId()).oculto(false).build();
  return ForumMapper.toTopic(topics.save(t));
 }
 public TopicDto update(Long id,TopicDto dto){Topic t=topics.findById(id).orElseThrow();t.setTitulo(dto.titulo());t.setContenido(dto.contenido());return ForumMapper.toTopic(topics.save(t));}
 public void delete(Long id){topics.deleteById(id);}
 public CommentDto addComment(Long topicId,CommentDto dto){Topic t=topics.findById(topicId).orElseThrow();Comment c=Comment.builder().contenido(dto.contenido()).topic(t).usuarioId(dto.usuarioId()).oculto(false).build();return ForumMapper.toComment(comments.save(c));}
 public CommentDto updateComment(Long id,CommentDto dto){Comment c=comments.findById(id).orElseThrow();c.setContenido(dto.contenido());return ForumMapper.toComment(comments.save(c));}
 public void deleteComment(Long id){comments.deleteById(id);}
 public TopicDto moderateTopic(Long id,boolean hidden){Topic t=topics.findById(id).orElseThrow();t.setOculto(hidden);return ForumMapper.toTopic(topics.save(t));}
 public CommentDto moderateComment(Long id,boolean hidden){Comment c=comments.findById(id).orElseThrow();c.setOculto(hidden);return ForumMapper.toComment(comments.save(c));}
}
