package com.foro.forum.entity;
import jakarta.persistence.*; import lombok.*;
import java.time.Instant;
@Entity @Table(name="comentario") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Comment {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String contenido;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="tema_id",nullable=false) private Topic topic;
 @Column(name="usuario_id",nullable=false) private Long usuarioId;
 @Builder.Default @Column(nullable=false) private boolean oculto=false;
 @Column(name="fecha_creacion") private Instant fechaCreacion;
}
