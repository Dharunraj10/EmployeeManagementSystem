import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function UpdateEmployee() {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    designation: '',
    salary: ''
  });

  const [isIdDisabled, setIsIdDisabled] = useState(false); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFetchEmployee = () => {
    if (!employee.id) {
      setSnackbarMessage("Please enter an Employee ID.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    axios.get(`https://empmanagement-backend-k7gy.onrender.com/search/id/${employee.id}`)
      .then(response => {
        setEmployee(response.data);
        setSnackbarMessage("Employee data fetched successfully.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setIsIdDisabled(true); 
      })
      .catch(error => {
        console.error("Error fetching employee:", error);
        setSnackbarMessage("Employee not found.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee.name || !employee.designation || !employee.salary) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    axios.put('https://empmanagement-backend-k7gy.onrender.com/updateEmployee', employee)
      .then(response => {
        setSnackbarMessage("Employee updated successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error("Error updating employee:", error);
        setSnackbarMessage("Failed to update employee.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleReset = () => {
    setEmployee({ id: '', name: '', designation: '', salary: '' });
    setIsIdDisabled(false); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 500, margin: 'auto', marginTop: 50 }}>
      <Typography variant="h5" gutterBottom>Update Employee</Typography>

      <TextField
        label="Employee ID"
        name="id"
        value={employee.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
        disabled={isIdDisabled} 
        InputProps={{
          inputProps: {
            step: 1,
            min:1,
            max:1000000 
          }
        }}
      />
      <Button variant="outlined" color="primary" onClick={handleFetchEmployee} fullWidth>
        Fetch Employee
      </Button>

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
          Update Employee
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset} fullWidth style={{ marginTop: 10 }}>
          Reset
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
