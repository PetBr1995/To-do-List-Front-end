import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Carrega tarefas da API
  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/todos");
      setTasks(res.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/todos/delete/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  return (
    <>
      {/* Topo da página */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Tarefas
        </Typography>

        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => navigate("/criartarefa")}
          sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}
        >
          Criar Tarefa
        </Button>
      </Box>

      {/* Grid de tarefas */}
      <Grid container spacing={2}>
        {tasks.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            Nenhuma tarefa encontrada.
          </Typography>
        )}

        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card sx={{ backgroundColor: "#1e2539" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {task.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Vencimento: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={task.status === "concluido" ? "Concluída" : "Pendente"}
                    color={task.status === "concluido" ? "success" : "warning"}
                    size="small"
                  />
                </Box>
              </CardContent>

              <CardActions>
                <IconButton
                  onClick={() => navigate(`/editartarefa/${task._id}`)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTask(task._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Task;
