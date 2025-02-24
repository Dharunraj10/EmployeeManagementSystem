import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    designation: '',
    salary: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!employee.name || !employee.designation || !employee.salary) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    axios.post('http://localhost:8080/addEmployee', employee)
      .then(response => {
        setSnackbarMessage("Employee added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setEmployee({ id: '', name: '', designation: '', salary: '' }); 
      })
      .catch(error => {
        console.error("Error adding employee:", error);
        setSnackbarMessage("Failed to add employee.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 500, margin: 'auto', marginTop: 50 }}>
      <Typography variant="h5" gutterBottom>Add Employee</Typography>
      <form onSubmit={handleSubmit}>
        
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Designation"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          InputProps={{
            inputProps: {
            
              min:10000,
              max:1000000 
              
            }
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Employee
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
