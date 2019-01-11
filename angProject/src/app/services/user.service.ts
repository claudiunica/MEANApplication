import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }


  getUsers(){
    return this.http.get('http://localhost:3000/users/getUsers');
  }

  deleteUser(id){
      return this.http.delete('http://localhost:3000/users/deleteUsers' + `/${id}`);
  }

}
