// src/pages/EditTask.jsx
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  });

  const [originalForm, setOriginalForm] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Carrega a tarefa atual
  const loadTask = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/todos/${id}`);

      const task = res.data;

      const parsed = {
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        status: task.status || 'pendente',
      };

      setForm(parsed);
      setOriginalForm(parsed);
    } catch (err) {
      console.error('Erro ao carregar tarefa:', err);
    }
  };

  useEffect(() => {
    loadTask();
  }, [id]);

  // Atualiza campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza tarefa
  const updateTask = async () => {
    const updatedFields = {};

    for (const key in form) {
      if (form[key] !== originalForm[key]) {
        updatedFields[key] = form[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      alert('Nenhuma alteração feita.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/api/todos/update/${id}`,
        updatedFields
      );

      setOpenSnackbar(true);
      setTimeout(() => navigate('/tarefas'), 1500);
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/tarefas')}
        sx={{ mb: 3 }}
        variant='contained'
      >
        Voltar
      </Button>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Editar Tarefa
      </Typography>

      <TextField
        fullWidth
        label="Título"
        name="title"
        value={form.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={form.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="date"
        label="Data de Vencimento"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        fullWidth
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        sx={{ mb: 3 }}
      >
        <MenuItem value="pendente">Pendente</MenuItem>
        <MenuItem value="concluído">Concluído</MenuItem>
      </TextField>

      <Button variant="contained" fullWidth onClick={updateTask}>
        Salvar Alterações
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Tarefa atualizada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditTask;
