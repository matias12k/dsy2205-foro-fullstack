package com.foro.forum.entity;
import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="categoria") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Category {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private String nombre;
 private String descripcion;
}
