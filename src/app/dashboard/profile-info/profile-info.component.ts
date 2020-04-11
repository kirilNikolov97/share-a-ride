import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {PasswordChange} from '../../model/password.change.model';
import {NavigationService} from '../../_services/navigation.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  user: User;
  changePassword: PasswordChange;
  errorUserMessage = '';
  errorPasswordMessage = '';
  successUserMessage = '';
  successPasswordMessage = '';
  isValidFormSubmitted = false;

  constructor(private apiServiceProfile: ProfileApiService, private navigation: NavigationService) { }

  ngOnInit() {
    this.user = new User();
    this.changePassword = new PasswordChange();

    this.apiServiceProfile.getUser().subscribe( res => {
      this.user = res;
      console.log(res);
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.updateUser(this.user).subscribe(
      res => {
        this.user = res;
        this.errorPasswordMessage = '';
        this.successPasswordMessage = '';
        this.errorUserMessage = '';
        this.successUserMessage = 'Successfully updated your personal info.';
      }, err => {
        this.successPasswordMessage = '';
        this.errorPasswordMessage = '';
        this.successUserMessage = '';
        this.errorUserMessage = err.error.message;
      });
  }

  changePass(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.changePass(this.changePassword).subscribe(
      res => {
        this.errorUserMessage = '';
        this.errorPasswordMessage = '';
        this.successPasswordMessage = 'Successfully changed your password!';
      }, err => {
        this.successUserMessage = '';
        this.errorUserMessage = '';
        this.successPasswordMessage = '';
        this.errorPasswordMessage = err.error.message;
      });
  }
}
