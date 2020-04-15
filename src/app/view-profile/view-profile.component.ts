import { Component, OnInit } from '@angular/core';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {User} from '../model/user.model';
import {ActivatedRoute} from '@angular/router';
import {Route} from '../model/route.model';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user: User;
  userId: string;
  myRating: number;
  currentRate: number;
  futureRoutes: Route[];
  pastRoutes: Route[];
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    this.myRating = 0;
    this.user = new User();

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiServiceProfile.getUserById(this.userId).subscribe(res => {
      this.user = res;
      this.myRating = this.calculateRating();

      this.apiServiceProfile.getFutureUserRoutesAsDriverByUserId(this.user.username).subscribe(res3 => {
        this.futureRoutes = res3;
      });

      this.apiServiceProfile.getUserRoutesAsDriverByUsername(this.user.username).subscribe(res2 => {
        this.pastRoutes = res2;
      });
    });
  }

  private calculateRating() {
    let sum = 0;
    this.user.ratings.forEach(x => {
      sum += x.rate;
    });
    return sum / this.user.ratings.length;
  }

  rateUser() {
    this.apiServiceProfile.rateUser(this.userId, this.currentRate).subscribe(
      res => {
        window.location.reload();
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}
