import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';
import * as jwt_decode from "jwt-decode";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  constructor(private empService: EmployeeService,  private authService: AuthenticationService,private router: Router) { }

  employees: Employee[];
  selectedEmployee: any = {};
  selectedEmployeeObject: any = {};

  employeeObj: any = {};
  emp_id: Number = 0;
  emp_name: String = "";
  salary: Number = 0;

  username = jwt_decode(localStorage.getItem('token')).user.name;


  ngOnInit() {
    this.empService
      .getEmployees()
      .subscribe((data: Employee[]) => { this.employees = data; })
  }

  logout(){
    this.authService.logout();
    location.reload();

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

  sortOrder: any = -1;

  sortEmployees() {
    console.log('sortEmployee() called')
    this.sortOrder = !this.sortOrder;

    this.employees.sort((a, b) => {
      const sal1 = a.salary;
      const sal2 = b.salary;
      let comparison = -1;
      if (sal1 > sal2) {
       return comparison;
      }
       
      return comparison * this.sortOrder;
    });
  }

  downloadEmployees(){
    console.log(this.table)
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}

