package com.gvlb.tarefas_todo_app.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
    @GetMapping
    public String HelloWorld(){
        return "helooooow";
    }
}
