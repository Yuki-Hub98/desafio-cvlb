package com.gvlb.tarefas_todo_app.repositories;

import com.gvlb.tarefas_todo_app.DTO.TodoRequestTDO;
import com.gvlb.tarefas_todo_app.domains.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
