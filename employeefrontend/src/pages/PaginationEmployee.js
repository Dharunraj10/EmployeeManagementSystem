import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';

export default function PaginationEmployee() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [orderBy, setOrderBy] = useState('id'); 
  const [order, setOrder] = useState('asc');   

  
  const fetchEmployees = (currentPage, pageSize, sortField, sortOrder) => {
    axios.get(`http://localhost:8080/paginationSorting/${currentPage}/${pageSize}/${sortField}?sortDir=${sortOrder}`)
      .then(response => {
        console.log("API Response:", response.data);
        setEmployees(response.data.content);
        setTotalEmployees(response.data.totalElements);
      })
      .catch(error => console.error("Error fetching employees:", error));
  };

  useEffect(() => {
    fetchEmployees(page, rowsPerPage, orderBy, order);
  }, [page, rowsPerPage, orderBy, order]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Employee List with Pagination & Sorting
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['id', 'name', 'designation', 'salary'].map((field) => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSort(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalEmployees}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
