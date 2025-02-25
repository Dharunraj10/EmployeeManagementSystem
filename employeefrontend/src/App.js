import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, Paper, Typography, Alert } from '@mui/material';
import MenuBar from './pages/MenuBar';
import ListEmployee from './pages/ListEmployee';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import PaginationEmployee from './pages/PaginationEmployee';

export default function App() {
  const [searchResult, setSearchResult] = useState(undefined);

  return (
    <Router>
      <MainContent searchResult={searchResult} setSearchResult={setSearchResult} />
    </Router>
  );
}

function MainContent({ searchResult, setSearchResult }) {
  const location = useLocation();

  React.useEffect(() => {
    setSearchResult(undefined);
  }, [location.pathname, setSearchResult]);

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', // Make the Box take up the full height of the screen
    }}>
      <MenuBar onSearchResult={setSearchResult} />
      <Box sx={{
        flexGrow: 1, // This makes the content area stretch and fill available space
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {searchResult === undefined ? (
          <Routes>
            <Route path="/list" element={<ListEmployee />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/update" element={<UpdateEmployee />} />
            <Route path="/pagination" element={<PaginationEmployee />} />
            <Route path="/deleteemployee" element={<DeleteEmployee />} />
          </Routes>
        ) : searchResult ? (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Search Result</Typography>
            <Typography><strong>ID:</strong> {searchResult.id}</Typography>
            <Typography><strong>Name:</strong> {searchResult.name}</Typography>
            <Typography><strong>Designation:</strong> {searchResult.designation}</Typography>
            <Typography><strong>Salary:</strong> {searchResult.salary}</Typography>
          </Paper>
        ) : (
          <Alert severity="error">No Employee Found</Alert>
        )}
      </Box>
    </Box>
  );
}
