import React from 'react';
import { useLocation } from 'react-router-dom';
import { Drawer, List, Typography, Toolbar } from '@mui/material';
import { Home as HomeIcon, Info as AboutIcon, AccessTime as ClockIcon } from '@mui/icons-material';
import NavigationItem from './NavigationItem';

const drawerWidth = 240;

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactElement;
}

export default function Navigation() {
  const location = useLocation();
  
  const menuItems: MenuItem[] = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/clock', label: 'Clock', icon: <ClockIcon /> },
    { path: '/about', label: 'About', icon: <AboutIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#1e293b', fontWeight: 600 }}>
          Todo App
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <NavigationItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isSelected={location.pathname === item.path}
          />
        ))}
      </List>
    </Drawer>
  );
}
