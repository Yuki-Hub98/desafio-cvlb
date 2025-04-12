package com.gvlb.tarefas_todo_app.DTO;

import java.time.LocalDate;

public record TodoRequestTDO(String id, String username, String titulo, Boolean status,
                             Boolean importante,
                             String descricao
                             ) {
}
