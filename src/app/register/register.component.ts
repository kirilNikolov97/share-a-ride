import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {NavigationService} from '../_services/navigation.service';

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

  constructor(private authService: AuthService, private navigation: NavigationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = 'Something went wrong. Try again later';
        if (err.error.message.toLowerCase().includes('username')) {
          this.errorMessage = 'Username is already taken';
        } else if (err.error.message.includes('Email')) {
          this.errorMessage = 'Email is already taken';
        }
        this.isSignUpFailed = true;
      }
    );
  }

  openLogin() {
    this.navigation.open('/login');
  }
}
