import { Component, OnInit } from '@angular/core';
import {TopUser} from '../model/dto/top-user';
import {ProfileApiService} from '../_services/api/profile-api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  topUsers: TopUser[];
  cnt: number;

  constructor(
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {
    this.cnt = 0;

    this.apiServiceProfile.getTop15Users().subscribe(res => {
      console.log(' TOP 15 USERS ');
      console.log(res);
      this.topUsers = res;
    });
  }

}
