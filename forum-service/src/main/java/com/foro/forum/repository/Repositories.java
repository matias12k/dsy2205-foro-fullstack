package com.foro.forum.repository;
import com.foro.forum.entity.*; import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface Repositories {
 interface CategoryRepository extends JpaRepository<Category,Long>{}
 interface TopicRepository extends JpaRepository<Topic,Long>{
  List<Topic> findByCategoryId(Long categoryId);
  List<Topic> findByTituloContainingIgnoreCase(String titulo);
 }
 interface CommentRepository extends JpaRepository<Comment,Long>{}
}
