import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, type IconProps } from '@mui/material';

interface NavigationItemProps {
  path: string;
  label: string;
  icon: React.ReactElement;
  isSelected: boolean;
}

export default function NavigationItem({ path, label, icon, isSelected }: NavigationItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton 
        component="a" 
        href={path} 
        sx={{ 
          borderRadius: '8px', 
          mx: 1, 
          mb: 1,
          backgroundColor: isSelected ? '#dbeafe' : 'transparent',
          '&:hover': { backgroundColor: isSelected ? '#dbeafe' : '#e0f2fe' }
        }}
      >
        <ListItemIcon>
          {React.cloneElement(icon as React.ReactElement<IconProps>, { 
            sx: { color: isSelected ? '#1d4ed8' : '#0ea5e9' } 
          })}
        </ListItemIcon>
        <ListItemText 
          primary={label} 
          sx={{ 
            '& .MuiListItemText-primary': { 
              fontWeight: isSelected ? 600 : 500,
              color: isSelected ? '#1d4ed8' : 'inherit'
            } 
          }} 
        />
      </ListItemButton>
    </ListItem>
  );
}
