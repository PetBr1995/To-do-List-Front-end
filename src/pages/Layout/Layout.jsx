import React from 'react';
import { Outlet, Link } from 'react-router-dom';
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
    CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Task } from '@mui/icons-material';

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

export default function Layout() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => setOpen(prev => !prev);

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Tarefas', icon: <Task />, path: '/tarefas' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidthOpen : drawerWidthClosed,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidthOpen : drawerWidthClosed,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                    },
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: open ? 'flex-end' : 'center',
                        px: open ? 1 : 0,
                        minHeight: 48,
                    }}
                >
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            transition: 'transform 0.3s',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>

                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
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

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
