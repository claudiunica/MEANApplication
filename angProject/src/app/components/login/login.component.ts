import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }



  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('loginForm value:'+JSON.stringify((this.loginForm.value)))

    if (!this.loginForm.valid) {
      console.log('Invalid')
      return;
    }
    this.authService
      .login(JSON.stringify(this.loginForm.value))
      .then(
        data => {
          console.log('token:'+localStorage.getItem('token'));
          if (localStorage.getItem('token')===null) { 
            console.log('wrong input')
          }
          else {  
          this.router.navigate(['/employee']);}
          
        },
        error => { console.log("Please login to have access at your profile.") });
  }

  register() {
    this.router.navigate(['/register']);
  }
  onSubmit() {
    console.log(this.loginForm);

  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

}
