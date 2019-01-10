import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }


  login(body: any) {
    // console.log(body)
    return this.http.post<any>('http://localhost:3000/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).toPromise().then((x) => {
      // console.log('from service' + x.token)
      if (x.token) {
        localStorage.setItem('token', x.token);
        localStorage.setItem('timeout', x.timeout);
      }
      // localStorage.setItem('email', x.email);
      // localStorage.setItem('name', x.name);
    });

  }

  register(body){
    return this.http.post<any>('http://localhost:3000/users/register', body, {
      observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
  }
}
