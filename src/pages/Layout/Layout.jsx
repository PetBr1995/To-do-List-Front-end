import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Task } from '@mui/icons-material';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

export default function Layout() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Tarefas', icon: <Task />, path: '/tarefas' },
  ];

  // Fecha ao clicar fora
  const handleClickOutside = () => {
    if (open) setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />

      {/* Overlay ao clicar fora */}
      {open && (
        <Box
          onClick={handleClickOutside}
          sx={{
            position: 'fixed',
            top: 0,
            left: drawerWidthOpen,
            width: `calc(100% - ${drawerWidthOpen}px)`,
            height: '100vh',
            zIndex: 1200,
            backgroundColor: 'transparent',
          }}
        />
      )}

      {/* Botão flutuante */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: open ? drawerWidthOpen + 8 : drawerWidthClosed + 8,
          zIndex: 1301,
          transition: 'left 0.3s',
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            transition: 'transform 0.3s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            backgroundColor: '#1e2539',
            color: '#fff',
            '&:hover': { backgroundColor: '#2a314b' },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Drawer sobreposto */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          zIndex: 1300,
          position: 'fixed',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            overflowX: 'hidden',
            transition: 'width 0.3s',
            backgroundColor: '#121829',
            color: '#fff',
            borderRight: '1px solid #2a314b',
            boxShadow: open ? '4px 0 12px rgba(0,0,0,0.2)' : 'none',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 48 }} />
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: '#1e2539',
                    color: '#FFB800',
                    '& .MuiListItemIcon-root': {
                      color: '#FFB800',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidthClosed}px`,
          transition: 'margin-left 0.3s',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
