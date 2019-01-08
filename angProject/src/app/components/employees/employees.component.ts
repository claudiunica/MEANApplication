import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private empService: EmployeeService, private router: Router) { }

  employees: Employee[];
  selectedEmployee: any = {};
  selectedEmployeeObject: any = {};

  p = 1;


  employeeObj: any = {};
  emp_id: Number = 0;
  emp_name: String = "";
  salary: Number = 0;

  itemsPerPage: any = 4;
  ngOnInit() {
    
    this.empService
      .getEmployees()
      .subscribe((data: Employee[]) => { this.employees = data; })
  }

  //Select employee id
  selectElement(element) {
    this.selectedEmployee = element.emp_id;
  }
  //Select employee object
  selectEmployeeObject(element) {
    this.selectedEmployeeObject = element;
  }

  deleteEmployee(id) {
    console.log('Deleting employee ' + id);
    if (confirm('Are you sure you want to permanently delete this employee?') == true) {
      this.empService
        .deleteEmployee(id)
        .subscribe(resp => {
          console.log(resp)
        })
    }
    location.reload();
  }
  searchEmployee(name) {
    console.log(name);
    this.empService
      .searchEmployee(name)
      .subscribe(resp => {
        console.log(resp)
      });
  }
}

