import { Component, OnInit } from '@angular/core';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {User} from '../model/user.model';
import {NavigationService} from '../_services/navigation.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  foundUsersByUsername: User[];
  username: string;

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {}

  searchByUsername() {
    this.apiServiceProfile.searchByUsername(this.username).subscribe(res => {
      this.foundUsersByUsername = res;
    });
  }

  openProfile(userId: string) {
    this.navigation.open('/view-profile/' + userId);
  }
}
