import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Employee } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, private router: Router) { }

  searchEmployee(name) {
    console.log('am ajuns aici ' + name)
    return this.http.get('http://localhost:3000/employees/searchEmployees' + `/${name}`);
  }
  getEmployees() {
    return this.http.get('http://localhost:3000/employees/getEmployees');
  }
  getEmployeesById(id) {
    return this.http.get('http://localhost:3000/employees/getEmployees' + `/${id}`);
  }

  addEmployee(elem) {
    console.log(elem);
    return this.http.post('http://localhost:3000/employees/addEmployees', elem, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  deleteEmployee(id) {
    console.log('id from service:' + id);
    return this.http.delete('http://localhost:3000/employees/deleteEmployees' + `/${id}`);
  }
  updateEmployee(employee) {
    console.log('am ajuns aici')
    return this.http.put('http://localhost:3000/employees/updateEmployees' + `/${employee.emp_id}`, employee);
  }

}