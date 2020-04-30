import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {Route} from '../../model/route.model';
import {NavigationService} from '../../_services/navigation.service';
import {Address} from '../../model/address.model';
import {Car} from '../../model/car.model';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userRating: number;
  addresses: Address[];
  futureRoutesAsDriver: Route[];
  futureRoutesAsDriverWaitingForApproval: Route[];
  cars: Car[];

  constructor(
    private apiServiceProfile: ProfileApiService,
    public navigation: NavigationService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit() {
    this.tokenService.saveSelectedMenuSidebar('profile');
    this.user = new User();
    this.futureRoutesAsDriverWaitingForApproval = [];

    this.apiServiceProfile.getUser().subscribe( res => {
      this.user = res;
      this.userRating = this.calculateRating(this.user);
      this.addresses = this.user.addresses.filter(address => !address.deleted);
      this.cars = this.user.cars.filter(car => !car.deleted);
    });

    this.apiServiceProfile.getFutureUserRoutesAsDriver().subscribe( res => {
      this.futureRoutesAsDriver = res;

      for (let r of this.futureRoutesAsDriver) {
        for (let rs of r.routeStops) {
          if (!rs.approved) {
            this.futureRoutesAsDriverWaitingForApproval.push(r);
            break;
          }
        }
      }
    });
  }

  private calculateRating(user: User) {
    if (user.ratings.length === 0) {
      return 0;
    }

    let cnt = 0;
    for (let r of user.ratings) {
      cnt += r.rate;
    }
    return cnt / user.ratings.length;
  }

  viewOnMap(routeId, routeStopId) {
    this.navigation.openWithQueryParams('/profile/routes/review/' + routeId, {'routeStopId' : routeStopId});
  }

  approveRouteStop(routeStopId) {
    this.apiServiceProfile.approveRouteStop(routeStopId).subscribe(res => {
      this.navigation.reload();
    });
  }

  declineRouteStop(routeStopId) {
    this.apiServiceProfile.declineRouteStop(routeStopId).subscribe(res => {
      this.navigation.reload();
    });
  }

  openProfile(driverId) {
    this.navigation.open('/view-profile/' + driverId);
  }
}
