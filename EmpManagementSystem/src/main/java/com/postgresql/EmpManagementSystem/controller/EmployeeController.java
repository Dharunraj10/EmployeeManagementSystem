package com.postgresql.EmpManagementSystem.controller;

import com.postgresql.EmpManagementSystem.model.Employee;
import com.postgresql.EmpManagementSystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
    @Autowired
    EmployeeService service;

    @PostMapping("/addEmployee")
    public void addEmployee(@RequestBody Employee emp)
    {
        service.addEmployee(emp);
    }

    @GetMapping("/listEmployees")
    public List<Employee> listEmployees()
    {
        return service.listEmployees();
    }


    @PutMapping("/updateEmployee")
    public void updateEmployee(@RequestBody Employee emp)
    {
        service.updateEmployee(emp);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public void deleteEmployeeById(@PathVariable long id)
    {
        service.deleteEmployeeById(id);
    }

    @GetMapping("/sortBy/{field}")
    public List<Employee> sortBy(@PathVariable String field)
    {
         return service.sortBy(field);

    }

    @GetMapping("/pagination/{offset}/{pageSize}")
    public Page<Employee> findEmployeeWithPagination(@PathVariable int offset, @PathVariable int pageSize)
    {
        return service.findEmployeeWithPagination(offset,pageSize);
    }
    @GetMapping("/paginationSorting/{offset}/{pageSize}/{field}")
    public Page<Employee> findEmployeeWithPaginationAndSorting(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @PathVariable String field,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return service.findEmployeeWithPaginationAndSorting(offset, pageSize, field,sortDir);

    }
    @GetMapping("/search/id/{id}")
    public ResponseEntity<Employee> searchEmployeeById(@PathVariable long id) {
        Employee emp = service.searchEmployeeById(id);
        return (emp != null) ? ResponseEntity.ok(emp) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search/name/{name}")
    public ResponseEntity<Employee> searchEmployeeByName(@PathVariable String name) {
        Employee emp = service.searchEmployeeByName(name);
        return (emp != null) ? ResponseEntity.ok(emp) : ResponseEntity.notFound().build();
    }

}
