package com.gvlb.tarefas_todo_app.domains.todo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gvlb.tarefas_todo_app.domains.user.User;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.time.LocalDate;
import lombok.*;


@Entity(name = "todos")
@Table(name = "todos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "titulo", nullable = false, length = 50)
    private String titulo;

    @Column(name = "status", nullable = false)
    private boolean status = false;

    @Column(name = "importante", nullable = false)
    private boolean importante = false;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User userTodo;
}