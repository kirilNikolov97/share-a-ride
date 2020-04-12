import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = 'Something went wrong. Try again later';
        console.log(err.error.message);
        if (err.error.message.toLowerCase().includes('username')) {
          this.errorMessage = 'Username is already taken';
        } else if (err.error.message.includes('Email')) {
          this.errorMessage = 'Email is already taken';
        }
        this.isSignUpFailed = true;
      }
    );
  }

}
