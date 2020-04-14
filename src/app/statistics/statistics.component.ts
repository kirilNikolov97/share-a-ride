import { Component, OnInit } from '@angular/core';
import {TopUser} from '../model/dto/top-user';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {NavigationService} from '../_services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  topUsers: TopUser[];
  cnt: number;

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.cnt = 0;

    this.apiServiceProfile.getTop15Users().subscribe(res => {
      console.log(res);
      this.topUsers = res;
    });
  }

  openProfile(id: string) {
    this.navigation.open('/view-profile/' + id);
  }
}
