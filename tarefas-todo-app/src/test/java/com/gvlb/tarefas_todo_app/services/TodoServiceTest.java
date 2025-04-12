package com.gvlb.tarefas_todo_app.services;

import com.gvlb.tarefas_todo_app.DTO.TodoRequestTDO;
import com.gvlb.tarefas_todo_app.configurations.security.SecurityFilter;
import com.gvlb.tarefas_todo_app.domains.todo.Todo;
import com.gvlb.tarefas_todo_app.domains.user.User;
import com.gvlb.tarefas_todo_app.repositories.TodoRepository;
import com.gvlb.tarefas_todo_app.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityFilter securityFilter;

    @InjectMocks
    private TodoService todoService;

    private User user = new User("usuarioTeste", "senha123");
    private Todo todo;
    private TodoRequestTDO todoRequest;

    @BeforeEach
    void setUp() {
        user = new User("usuarioTeste", "senha123");

        todo = new Todo();
        todo.setId(1L);
        todo.setTitulo("Teste");
        todo.setDescricao("Descrição");
        todo.setStatus(false);
        todo.setImportante(false);
        todo.setUserTodo(user);

        todoRequest = new TodoRequestTDO(
                String.valueOf(todo.getId()),
                user.getUsername(),
                todo.getTitulo(),
                todo.isStatus(),
                todo.isImportante(),
                todo.getDescricao()
        );
    }

    @DisplayName("Deve retornar todos os todos cadastrados")
    void getAllTodos() {
        when(todoRepository.findAll()).thenReturn(List.of(todo));

        List<Todo> result = todoService.getAllTodos();

        assertEquals(1, result.size());
        assertEquals(todo.getTitulo(), result.get(0).getTitulo());
        verify(todoRepository).findAll();
    }

    @Test
    @DisplayName("Deve criar um novo todo com sucesso")
    void createTodo() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Todo created = todoService.createTodo(todoRequest);

        assertEquals(todo.getTitulo(), created.getTitulo());
        assertEquals(todo.getUserTodo(), created.getUserTodo());
        verify(userRepository).findByUsername(user.getUsername());
        verify(todoRepository).save(any(Todo.class));
    }

    @Test
    @DisplayName("Deve editar um todo existente corretamente")
    void editTodo() {
        when(todoRepository.findById(todo.getId())).thenReturn(Optional.of(todo));
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Todo edited = todoService.editTodo(todoRequest);

        assertEquals(todo.getTitulo(), edited.getTitulo());
        verify(todoRepository).findById(todo.getId());
        verify(todoRepository).save(any(Todo.class));
    }

    @Test
    @DisplayName("Deve deletar o todo com base no ID informado")
    void deleteTodo() {
        Long id = todo.getId();

        doNothing().when(todoRepository).deleteById(id);

        String deletedId = todoService.deleteTodo(String.valueOf(id));

        assertEquals(String.valueOf(id), deletedId);
        verify(todoRepository).deleteById(id);
    }

}