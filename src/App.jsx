import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import TaskList from './pages/Tasks/Tasks';
import CreateTask from './components/CreateTask/CreateTask';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout pai */}
        <Route path="/" element={<Layout />}>
          {/* rotas filhas que vão para o <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="tarefas" element={<TaskList />} />
          {/* se quiser outras páginas, adicione aqui */}
          <Route path='/criartarefa' element={<CreateTask/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
