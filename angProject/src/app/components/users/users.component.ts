import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  selectedUser : any = {};

  constructor(private userService: UserService, private router: Router) { }

  users: User[];

  ngOnInit() {
    this.userService
    .getUsers()
    .subscribe((data: User[]) => { this.users = data; })
  }
  selectElement(element) {
    this.selectedUser = element.user_id;
  }

  deleteUser(id) {
    console.log('Deleting user ' + id);
    if (confirm('Are you sure you want to permanently delete this user?') == true) {
      this.userService
        .deleteUser(id)
        .subscribe(resp => {
          console.log(resp)
        })
    }
    location.reload();
  }

}
