package com.gvlb.tarefas_todo_app.services;

import com.gvlb.tarefas_todo_app.DTO.TodoRequestTDO;
import com.gvlb.tarefas_todo_app.domains.todo.Todo;

import java.util.List;

public interface TodoServiceInterface {
    List<Todo> getAllTodos();

    List<Todo> getUserTodo(String username);

    Todo createTodo(TodoRequestTDO todoRequestTDO);

    Todo editTodo(TodoRequestTDO todoRequestTDO);

    String deleteTodo(String id);
}
