package com.gvlb.tarefas_todo_app.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
    @GetMapping
    public String HelloWorld(){
        return "helooooow";
    }
}
