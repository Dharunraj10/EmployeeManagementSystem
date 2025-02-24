package com.postgresql.EmpManagementSystem.service;

import com.postgresql.EmpManagementSystem.model.Employee;
import com.postgresql.EmpManagementSystem.repo.EmployeeRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepo repo;
    public void addEmployee(Employee emp)
    {
        repo.save(emp);
    }
    public List<Employee> listEmployees()
    {
         return repo.findAll();
    }

    public void updateEmployee(Employee emp)
    {
        repo.save(emp);
    }
    public void deleteEmployeeById(long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee with ID " + id + " not found.");
        }
    }

    public List<Employee> sortBy(String field)
    {
        return repo.findAll(Sort.by(Sort.Direction.ASC,field));
    }

    public Page<Employee> findEmployeeWithPagination(int offset,int pageSize)
    {
        return repo.findAll(PageRequest.of(offset,pageSize));
    }

    public Page<Employee> findEmployeeWithPaginationAndSorting( int offset, int pageSize,String field,String sortDir)
    {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(field).ascending() : Sort.by(field).descending();
        Pageable pageable = PageRequest.of(offset, pageSize, sort);
        return repo.findAll(pageable);
    }

    public Employee searchEmployeeById(long id) {
        return repo.findById(id).orElse(null);
    }

    public Employee searchEmployeeByName(String name) {
        return repo.findByName(name).orElse(null);
    }


}
