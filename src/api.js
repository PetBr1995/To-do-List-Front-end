import axios from 'axios';

// Cria uma instância de axios com a URL base da sua API
const API = axios.create({
  baseURL: 'http://localhost:3001/api/todo',
});

// Exporta as funções do CRUD
export const fetchTodos = () => API.get('/list');
export const deleteTodo = (id) => API.delete(`/delete/${id}`);
export const createTodo = (data) => API.post('/create', data);
export const updateTodo = (id, data) => API.put(`/update/${id}`, data);
