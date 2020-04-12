import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {Route} from '../../model/route.model';
import {NavigationService} from '../../_services/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  futureRoutesAsDriver: Route[];

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.user = new User();

    this.apiServiceProfile.getUser().subscribe( res => {
      this.user = res;
    });

    this.apiServiceProfile.getFutureUserRoutesAsDriver().subscribe( res => {
      this.futureRoutesAsDriver = res;
      console.log(res);

      console.log("ROUTES");
      console.log(this.futureRoutesAsDriver);

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
}
