package com.gvlb.tarefas_todo_app.repositories;

import com.gvlb.tarefas_todo_app.domains.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByUsername(String username);
}
