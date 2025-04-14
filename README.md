# desafio-cvlb

Este repositório tem como propósito apresentar a minha solução para o desafio CVLB.  
Agradeço pela oportunidade!

## ❗️IMPORTANTE

Antes de iniciar, certifique-se de que **nenhum serviço esteja utilizando as seguintes portas**:  
`8080:8080`, `5173:5173`, `5432:5432`, `5850:80`.  
Isso inclui containers Docker, servidores locais ou qualquer outro processo.

Além disso, você precisa ter o **Docker** instalado em sua máquina.

---

## 🛠️ Passo a passo para rodar o projeto

### 1️⃣ Configuração do banco de dados

- Com o repositório clonado, navegue até a pasta `postgres`.
- Crie um arquivo `.env` com base no arquivo `.env.example` presente na pasta.

### 2️⃣ Configuração da aplicação backend

- Vá até a pasta `tarefas-todo-app`.
- No arquivo `docker-compose.yml`, encontre a variável `SPRING_DATASOURCE_PASSWORD` e defina a mesma senha utilizada no `.env` do passo anterior.

### 3️⃣ Subindo os serviços

- Volte para a raiz do projeto e, no terminal, execute o seguinte comando:

```bash
docker compose up -d
```

## ✅ Executando os testes

Todos os serviços executam testes durante o processo de build.
No entanto, os serviços `tarefas-todo-app` e o `frontend` possuem arquivos `docker-compose` específicos para testes.

### ▶️ Como executar

1. Navegue até a pasta do serviço desejado (`tarefas-todo-app` ou `frontend`).
2. Execute o seguinte comando no terminal:

```bash
docker compose -f docker-compose.test.yml up --abort-on-container-exit --build
```
