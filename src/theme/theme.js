// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5b1d99', // Roxo como cor principal base
    },
    secondary: {
      main: '#1E2A46', // Azul escuro complementar
    },
    background: {
      default: '#0A1128', // Fundo geral
      paper: '#121829',   // Cards e caixas
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#5b1d99',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#491274',
            boxShadow: '0 4px 12px rgba(91, 29, 153, 0.3)',
          },
        },
        outlinedPrimary: {
          borderColor: '#5b1d99',
          color: '#5b1d99',
          '&:hover': {
            borderColor: '#491274',
            backgroundColor: 'rgba(91, 29, 153, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121829',
        },
      },
    },
  },
});

export default theme;
