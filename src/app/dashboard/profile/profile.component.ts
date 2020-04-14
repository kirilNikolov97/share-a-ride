import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {Route} from '../../model/route.model';
import {NavigationService} from '../../_services/navigation.service';
import {Address} from '../../model/address.model';
import {Car} from '../../model/car.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  addresses: Address[];
  futureRoutesAsDriver: Route[];
  futureRoutesAsDriverWaitingForApproval: Route[];
  cars: Car[];

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.user = new User();
    this.futureRoutesAsDriverWaitingForApproval = [];

    this.apiServiceProfile.getUser().subscribe( res => {
      this.user = res;
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
}
