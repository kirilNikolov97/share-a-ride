import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {PasswordChange} from '../../model/password.change.model';
import {NavigationService} from '../../_services/navigation.service';
import {NgForm} from '@angular/forms';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  showOldPassword = false;
  showNewPassword = false;
  user: User;
  changePassword: PasswordChange;
  errorUserMessage = '';
  errorPasswordMessage = '';
  successUserMessage = '';
  successPasswordMessage = '';
  isValidFormSubmitted = false;
  userPicture: File;
  errorPhoneMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private tokenService: TokenStorageService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.tokenService.saveSelectedMenuSidebar('profile-info');

    this.user = new User();
    this.changePassword = new PasswordChange();

    this.apiServiceProfile.getUser().subscribe( res => {
      this.user = res;
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    if (/^\d+$/.test(this.user.phone) === false) {
      this.errorPhoneMessage = 'Phone must contain only digits';
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
        this.navigation.reload();

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

  selectFile(event) {
    if (event.target.files.item(0).size / 1024 / 1024 > 4) {
      this.errorUserMessage = 'File is bigger then 5MB';
      return;
    }
    this.userPicture = event.target.files.item(0);
  }

  changePhoto() {
    this.apiServiceProfile.uploadPicture(this.userPicture).subscribe(
      res => {},
      error => {
        if (error.status === 200) {
          this.navigation.reload();
        } else {
          this.errorUserMessage = error.error.message;
        }
      });
  }

  showOrHideOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  showOrHideNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
}
