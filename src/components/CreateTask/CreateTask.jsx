import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const CreateTask = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:500px)');

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/todos/create', {
                ...formData,
                status: 'pendente',
            });
            setSuccessMessage(`Tarefa "${formData.title}" criada com sucesso!`);
            setOpenSnackbar(true);
            setTimeout(() => navigate('/tarefas'), 2000);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <>
            {/* Botões responsivos */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "space-between",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/tarefas')}
                    sx={{ fontWeight: 600 }}
                >
                    Retornar a Tarefas
                </Button>
                <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/')}
                    sx={{ fontWeight: 600 }}
                >
                    Retornar à Home
                </Button>
            </Box>

            {/* Formulário */}
            <Box sx={{ maxWidth: 500, margin: "auto" }}>
                <Typography variant="h5" textAlign="center" mb={4}>
                    Criar Tarefa
                </Typography>

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

                        <Button variant="contained" type="submit">
                            Salvar Tarefa
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Snackbar de sucesso */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateTask;
