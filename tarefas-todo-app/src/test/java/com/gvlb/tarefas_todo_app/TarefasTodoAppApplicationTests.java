package com.gvlb.tarefas_todo_app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class TarefasTodoAppApplicationTests {

	@Test
	void contextLoads() {
	}

}
