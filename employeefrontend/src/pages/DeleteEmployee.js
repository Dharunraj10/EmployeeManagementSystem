import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function DeleteEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleDelete = () => {
    if (!employeeId) {
      setSnackbarMessage("Please enter an Employee ID.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    axios.delete(`https://f932-14-195-132-106.ngrok-free.app/deleteEmployee/${employeeId}`)
      .then(() => {
        setSnackbarMessage("Employee deleted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setEmployeeId('');
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setSnackbarMessage("Failed to delete employee. Please check the ID.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 500, margin: 'auto', marginTop: 50 }}>
      <Typography variant="h5" gutterBottom>Delete Employee</Typography>

      <TextField
        label="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
        InputProps={{
          inputProps: {
            step: 1,
            min:1,
            max:1000000 
          }
        }}
      />

      <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
        Delete Employee
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
