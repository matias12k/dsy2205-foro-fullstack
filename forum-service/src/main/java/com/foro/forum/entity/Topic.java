package com.foro.forum.entity;
import jakarta.persistence.*; import lombok.*;
import java.time.Instant; import java.util.ArrayList; import java.util.List;
@Entity @Table(name="tema") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Topic {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String titulo;
 @Column(nullable=false) private String contenido;
 @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="categoria_id",nullable=false) private Category category;
 @Column(name="usuario_id",nullable=false) private Long usuarioId;
 @Builder.Default @Column(nullable=false) private boolean oculto=false;
 @Column(name="fecha_creacion") private Instant fechaCreacion;
 @OneToMany(mappedBy="topic",cascade=CascadeType.ALL,orphanRemoval=true) @Builder.Default private List<Comment> comments=new ArrayList<>();
}
