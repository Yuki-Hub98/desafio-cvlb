package com.gvlb.tarefas_todo_app.DTO;

import com.gvlb.tarefas_todo_app.domains.todo.Todo;

import java.util.List;

public record TodoResponseAllTDO(List<Todo> todos) {
}
