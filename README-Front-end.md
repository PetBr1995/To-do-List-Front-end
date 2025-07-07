📋 To-do List - Front-end
Este repositório contém a interface web de um sistema de gerenciamento de tarefas, desenvolvido em React com Material UI. O sistema permite a criação, visualização, edição e exclusão de tarefas, além de categorizá-las como concluídas ou pendentes.
🔗 Repositório: https://github.com/PetBr1995/To-do-List-Front-end

🚀 Tecnologias Utilizadas

React
React Router DOM
Axios
Material UI
JavaScript (ES6+)
Vite (caso esteja sendo utilizado)
MUI Icons


🧰 Funcionalidades

Criar tarefas com título, descrição e data de vencimento
Editar tarefas já existentes
Excluir tarefas com confirmação
Alterar status entre "pendente" e "concluído"
Listagem de tarefas em cards organizados
Feedback visual com Snackbar para ações como sucesso e erro
Validação de campos obrigatórios
```
📁 Estrutura de Pastas
src/
│
├── api/ # Arquivo de integração com a API (opcional)
├── components/ # Componentes reutilizáveis (Ex: Drawer, Navbar)
├── pages/ # Páginas principais: Tarefas, Criar, Editar
│ ├── Task.jsx
│ ├── CreateTask.jsx
│ └── EditTask.jsx
├── theme.js # Tema customizado do MUI
├── App.jsx # Componente raiz
├── main.jsx # Ponto de entrada da aplicação
└── routes.jsx # Definição das rotas
```

⚙️ Instalação e Execução
1. Clone o repositório
git clone https://github.com/PetBr1995/To-do-List-Front-end.git
cd To-do-List-Front-end

2. Instale as dependências
npm install

3. Configure a URL da API
Certifique-se de que o arquivo que faz requisições (ex: axios.get(...)) esteja apontando para o endereço correto da sua API, por padrão:
http://localhost:3001/api/todos

4. Execute o projeto
npm run dev

✅ Requisitos para rodar

Node.js (v18 ou superior recomendado)
Gerenciador de pacotes (npm ou yarn)
Backend da API rodando localmente na porta 3001
Navegador moderno (Chrome, Firefox, Edge)

🧪 Testes
Este projeto não possui testes automatizados no momento, mas todos os fluxos foram testados manualmente para garantir integridade funcional.

📌 Observações

A interface foi desenvolvida utilizando o padrão Material Design.
O layout é responsivo e pode ser utilizado em resoluções diferentes.
A listagem das tarefas é atualizada dinamicamente após criar, editar ou deletar.
O status é salvo no banco como um booleano done, mas convertido para "concluído" ou "pendente" na interface.


🧑‍💼 Autor
Desenvolvido por Peterson Brito como parte de um teste técnico.

LinkedIn: (www.linkedin.com/in/peterson-brito-048380149)
Email: (dev.petersonbrito@gmail.com)
