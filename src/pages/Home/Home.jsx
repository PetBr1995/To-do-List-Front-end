import { Add, Delete, Edit } from "@mui/icons-material";
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
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/todos");
      setTasks(res.data); // Store all tasks
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/todos/delete/${taskToDelete._id}`);
      setSuccessMessage(`Tarefa "${taskToDelete.title}" excluída com sucesso!`);
      setOpenSnackbar(true);
      setTaskToDelete(null);
      setOpenConfirmDialog(false);
      loadTasks();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  // Calculate task counts
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pendente").length;
  const completedTasks = tasks.filter((task) => task.status === "concluído").length;

  return (
    <>
      {/* Topo */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Tarefas Pendentes
        </Typography>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => navigate("/tarefas")}
          sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}
        >
          Ver Todas as Tarefas
        </Button>
      </Box>

      {/* Resumo de tarefas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#1e2539", border: "1px solid #2c2f4a", borderRadius: 3, width:"350px" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Total de Tarefas
              </Typography>
              <Typography variant="h4" color="#ffffff" sx={{ mt: 1 }}>
                {totalTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#1e2539", border: "1px solid #2c2f4a", borderRadius: 3,width:"350px" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Tarefas Pendentes
              </Typography>
              <Typography variant="h4" color="warning.main" sx={{ mt: 1 }}>
                {pendingTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#1e2539", border: "1px solid #2c2f4a", borderRadius: 3, width:"350px" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Tarefas Concluídas
              </Typography>
              <Typography variant="h4" color="success.main" sx={{ mt: 1 }}>
                {completedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de tarefas pendentes */}
      <Grid container spacing={3}>
        {pendingTasks === 0 && (
          <Typography variant="body1" color="text.secondary">
            Nenhuma tarefa pendente encontrada.
          </Typography>
        )}

        {tasks
          .filter((task) => task.status === "pendente")
          .map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
                sx={{
                  backgroundColor: "#1e2539",
                  border: "1px solid #2c2f4a",
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 4px 20px rgba(91, 29, 153, 0.2)",
                    cursor:"pointer"
                  },
                  width: "350px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {task.description || "Sem descrição"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Vencimento:{" "}
                    {task.dueDate && !isNaN(new Date(task.dueDate))
                      ? new Date(task.dueDate).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "Não definido"}
                  </Typography>
                  <Box mt={2}>
                    <Chip
                      label={task.status === "concluído" ? "Concluída" : "Pendente"}
                      color={task.status === "concluído" ? "success" : "warning"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                      }}
                    />
                  </Box>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Tooltip title="Editar">
                    <IconButton onClick={() => navigate(`/editartarefa/${task._id}`)} color="#ffffff">
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Excluir">
                    <IconButton
                      onClick={() => {
                        setTaskToDelete(task);
                        setOpenConfirmDialog(true);
                      }}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Snackbar */}
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

      {/* Dialog de confirmação */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a tarefa <strong>{taskToDelete?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
        >
          <Button onClick={() => setOpenConfirmDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteTask} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;