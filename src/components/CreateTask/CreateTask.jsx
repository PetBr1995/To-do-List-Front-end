import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const CreateTask = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Agora executa no submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // impede recarregamento da página

        try {
            await axios.post('http://localhost:3001/api/todos/create', {
                ...formData,
                status: 'pendente',
            });
            navigate('/tarefas');
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    variant="contained"
                    sx={{ marginBottom: "1rem", fontWeight: 600 }}
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/tarefas')}
                >
                    Retornar a Tarefas
                </Button>
                <Button
                    variant="contained"
                    sx={{ marginBottom: "1rem", fontWeight: 600 }}
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/')}
                >
                    Retornar a Tarefas
                </Button>
            </Box>

            <Box sx={{ maxWidth: 500, margin: "auto" }}>
                <Typography variant="h5" textAlign="center" mb={4}>
                    Criar Tarefa
                </Typography>

                {/* ✅ Formulário começa aqui */}
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection: "column",
                            alignItems: "stretch",
                        }}
                    >
                        <TextField
                            name="title"
                            label="Título"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="description"
                            label="Descrição"
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="dueDate"
                            label="Data de vencimento"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />

                        {/* ✅ Tipo submit = ativa validação HTML */}
                        <Button variant="contained" type="submit">
                            Salvar Tarefa
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default CreateTask;
