package com.gvlb.tarefas_todo_app.services;

import com.gvlb.tarefas_todo_app.DTO.TodoRequestTDO;
import com.gvlb.tarefas_todo_app.configurations.security.SecurityFilter;
import com.gvlb.tarefas_todo_app.domains.todo.Todo;
import com.gvlb.tarefas_todo_app.domains.user.User;
import com.gvlb.tarefas_todo_app.repositories.TodoRepository;
import com.gvlb.tarefas_todo_app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService implements TodoServiceInterface{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    SecurityFilter securityFilter;

    @Override
    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    @Override
    public List<Todo> getUserTodo(String username){
        User user = userFind(username);
        return todoRepository.findByUserTodo(user);
    }

    @Override
    public Todo createTodo(TodoRequestTDO todoRequestTDO){
        Todo todo = new Todo();
        return todoRepository.save(transformTodo(todoRequestTDO, todo));
    }

    @Override
    public Todo editTodo(TodoRequestTDO todoRequestTDO){
        Todo todo = todoRepository.findById(Long.parseLong(todoRequestTDO.id()))
                .orElseThrow(() -> new RuntimeException("Todo não encontrado com ID: " + todoRequestTDO.id()));
        return todoRepository.save(transformTodo(todoRequestTDO, todo));
    }

    @Override
    public String deleteTodo(String id){
        Long idTodo = Long.parseLong(id);
        todoRepository.deleteById(idTodo);
        return id;
    }

    private Todo transformTodo (TodoRequestTDO todoRequestTDO, Todo todo) {
        todo.setUserTodo(userFind(todoRequestTDO.username()));
        todo.setTitulo(todoRequestTDO.titulo());
        todo.setDescricao(todoRequestTDO.descricao());
        todo.setStatus(todoRequestTDO.status());
        todo.setImportante(todoRequestTDO.importante());
        return todo;
    }
    
    private User userFind(String username){
        User user = (User) userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("Usuário não encontrado" + username);
        }
        return user;
    }
}
