package com.gvlb.tarefas_todo_app.controllers;
import com.gvlb.tarefas_todo_app.DTO.TodoRequestTDO;
import com.gvlb.tarefas_todo_app.DTO.TodoResponseAllTDO;
import com.gvlb.tarefas_todo_app.DTO.TodoResponseTDO;
import com.gvlb.tarefas_todo_app.services.TodoServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    TodoServiceInterface todoServiceInterface;

    @GetMapping
    public ResponseEntity<TodoResponseAllTDO> getAllTodos(){
        return ResponseEntity.ok(new TodoResponseAllTDO(todoServiceInterface.getAllTodos()));
    }

    @PostMapping("/create")
    public  ResponseEntity<TodoResponseTDO> createTodo(@Valid @RequestBody  TodoRequestTDO requestTDO){
        return ResponseEntity.ok(new TodoResponseTDO(todoServiceInterface.createTodo(requestTDO)));
    }

    @PutMapping("/edit")
    public ResponseEntity<TodoResponseTDO> editTodo(@Valid @RequestBody  TodoRequestTDO requestTDO){
        return ResponseEntity.ok(new TodoResponseTDO(todoServiceInterface.editTodo(requestTDO)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@Valid @PathVariable String id ){
        return ResponseEntity.ok(todoServiceInterface.deleteTodo(id));
    }
}
