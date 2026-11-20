package com.foro.users.entity;
import jakarta.persistence.*; import lombok.*;
import java.time.Instant;
@Entity @Table(name="usuario") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String nombre;
 @Column(nullable=false,unique=true) private String email;
 @Column(nullable=false) private String password;
 @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="rol_id",nullable=false) private Role role;
 @Column(nullable=false) @Builder.Default private boolean activo=true;
 @Column(name="fecha_creacion") private Instant fechaCreacion;
}
