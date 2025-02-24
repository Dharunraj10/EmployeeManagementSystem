import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

export default function SearchBar({ onSearchResult }) {
  const [searchType, setSearchType] = useState('id'); 
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    if (!searchInput.trim()) return; 

    try {
      const response = await axios.get(`https://f932-14-195-132-106.ngrok-free.app/search/${searchType}/${searchInput}`);
      onSearchResult(response.data);
      setSearchInput(''); 
    } catch (error) {
      onSearchResult(null); 
      setSearchInput(''); 
    }
  };

  return (
    <>
      <TextField
        select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        size="small"
        sx={{ mr: 1, backgroundColor: 'white' }}
      >
        <MenuItem value="id">Search by ID</MenuItem>
        <MenuItem value="name">Search by Name</MenuItem>
      </TextField>

      <TextField
        label="Search Employee" 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        size="small"
        sx={{ mr: 1, backgroundColor: 'white' }}
      />

      <Button variant="contained" color="secondary" onClick={handleSearch}>
        Search
      </Button>
    </>
  );
}
