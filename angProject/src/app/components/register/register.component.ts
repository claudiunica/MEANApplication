import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  register(){
    console.log(this.registerForm.value)
    if (!this.registerForm.valid) {
      console.log('Invalid')
      return;
    }
    this.authService.register(JSON.stringify(this.registerForm.value))
    .subscribe(resp => {
      if(resp){
        this.router.navigate(['/login']);
      }
    });
  }

  isValid(controlName){
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }
}
