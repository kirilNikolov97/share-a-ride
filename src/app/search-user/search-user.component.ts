import { Component, OnInit } from '@angular/core';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {User} from '../model/user.model';
import {NavigationService} from '../_services/navigation.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  foundUsersByUsername: User[];
  username = '';
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    public tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {}

  searchByUsername() {
    if (!this.tokenStorageService.getCompany()) {
      this.apiServiceProfile.searchByUsername(this.username).subscribe(res => {
        this.foundUsersByUsername = res;
      });
    } else {
      this.apiServiceProfile.searchNotBlockedByUsername(this.username).subscribe(res => {
        this.foundUsersByUsername = res;
      });
    }
  }

  openProfile(userId: string) {
    this.navigation.open('/view-profile/' + userId);
  }

  blockUser(userId) {
    this.apiServiceProfile.blockUser(userId).subscribe(
      res => {
        this.navigation.reload();
      }, err => {
        this.errorMessage = 'Something went wrong.';
      });
  }

  unblockUser(userId) {
    this.apiServiceProfile.unblockUser(userId).subscribe(
      res => {
        this.navigation.reload();
      }, err => {
        this.errorMessage = 'Something went wrong.';
      });
  }
}
