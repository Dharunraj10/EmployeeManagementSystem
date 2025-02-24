import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export default function MenuBar({ onSearchResult }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [observabilityOpen, setObservabilityOpen] = useState(false); 

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleObservability = () => setObservabilityOpen(!observabilityOpen);

  const menuItems = [
    { text: 'List Employees', path: '/list' },
    { text: 'Add Employee', path: '/add' },
    { text: 'Update Employee', path: '/update' },
    { text: 'Delete Employee', path: '/deleteemployee' },
    { text: 'Pagination', path: '/pagination' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
       
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>

       
        <SearchBar onSearchResult={onSearchResult} />

    
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {menuItems.map((item) => (
            <MenuItem key={item.text} component={Link} to={item.path} onClick={handleMenuClose}>
              {item.text}
            </MenuItem>
          ))}

        
          <MenuItem onClick={toggleObservability}>
            Observability {observabilityOpen ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>

          {observabilityOpen && (
            <>
              <MenuItem component="a" href="https://bddc-14-195-132-106.ngrok-free.app/swagger-ui/index.html" target="_blank" onClick={handleMenuClose}>
                Swagger
              </MenuItem>
              <MenuItem component="a" href="http://localhost:5601" target="_blank" onClick={handleMenuClose}>
                ELK
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
