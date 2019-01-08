import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.model';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-emp-modal',
  templateUrl: './emp-modal.component.html',
  styleUrls: ['./emp-modal.component.css']
})
export class EmpModalComponent implements OnInit, OnChanges {


  constructor(private empService: EmployeeService, private router: Router) { }

  employees: Employee[];
  employeeObj: any = {};
  emp_id: Number = 0;
  emp_name: String = "";
  salary: Number = 0;

  @Input("id") receivedIdFromParentComponent;
  @Input("empObject") selectedEmployeeObject;

  ngOnInit() {
    this.empService
      .getEmployees()
      .subscribe((data: Employee[]) => { this.employees = data; })
  }

  ngOnChanges() {
    console.log(this.receivedIdFromParentComponent)
    
    console.log(this.selectedEmployeeObject)
  }
  
  getEmployeeById() {
    console.log('Viewing employee #' + this.receivedIdFromParentComponent)
    this.employeeObj ={
      emp_id:this.receivedIdFromParentComponent,
      emp_name:this.emp_name,
      salary:this.salary
    }
    this.empService
      .getEmployeesById(this.receivedIdFromParentComponent)
      .subscribe((data: Employee) => { this.employeeObj = data; })
  }


  addEmployee() {
    this.employeeObj = {
      //emp_id: this.emp_id,
      emp_name: this.emp_name,
      salary: this.salary
    }
    console.log(this.employeeObj);
    this.empService.addEmployee(this.employeeObj).subscribe(resp => {
      console.log(resp)
    })
    location.reload();
  }
  deleteEmployee(id) {
    console.log('Deleting employee ' + id);
    this.empService
      .deleteEmployee(id)
      .subscribe(resp => {
        console.log(resp)
      })
  }
  editEmployee() {
    console.log('Editing employee #' + this.receivedIdFromParentComponent)
    this.employeeObj = {
      emp_id: this.receivedIdFromParentComponent,
      emp_name: this.emp_name,
      salary: this.salary
    }
    console.log('Updating employee ' + this.receivedIdFromParentComponent)
    this.empService
      .updateEmployee(this.employeeObj)
      .subscribe(resp => {
        console.log(resp)
      })

    //location.reload();
  }

}
