// src/services/todoService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api/todo'
});

export function fetchTodos() {
  return API.get('/list');
}

export function deleteTodo(id) {
  return API.delete(`/delete/${id}`);
}

export function createTodo(data) {
  return API.post('/create', data);
}

export function updateTodo(id, data) {
  return API.put(`/update/${id}`, data);
}
