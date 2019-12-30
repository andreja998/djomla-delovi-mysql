import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private authUser: AuthUserService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    console.log(this.loginForm.get('username').value);
    this.authUser.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(res => {
      this.router.navigate(['admin']);
    });
  }

}
