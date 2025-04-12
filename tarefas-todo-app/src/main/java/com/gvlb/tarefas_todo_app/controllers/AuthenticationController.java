package com.gvlb.tarefas_todo_app.controllers;

import com.gvlb.tarefas_todo_app.DTO.AuthenticationRequestDTO;
import com.gvlb.tarefas_todo_app.DTO.AuthenticationResponseSuccessCreatedDTO;
import com.gvlb.tarefas_todo_app.DTO.AuthenticationResponseDTO;
import com.gvlb.tarefas_todo_app.domains.user.User;
import com.gvlb.tarefas_todo_app.repositories.UserRepository;
import com.gvlb.tarefas_todo_app.services.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private  UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new AuthenticationResponseDTO(token, data.username()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseSuccessCreatedDTO> register(@RequestBody @Valid AuthenticationRequestDTO data) throws Exception {
        if (this.repository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), encryptedPassword);

        this.repository.save(newUser);
        return ResponseEntity.ok(new AuthenticationResponseSuccessCreatedDTO(data.username(), "User created"));
    }
}
