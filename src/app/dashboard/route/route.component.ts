import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {NavigationService} from '../../_services/navigation.service';
import {Route} from '../../model/route.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  futureRoutesAsDriver: Route[];
  futureRoutesAsPassenger: Route[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private navigation: NavigationService,
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {

    this.apiServiceProfile.getFutureUserRoutesAsDriver().subscribe( res => {
      this.futureRoutesAsDriver = res;
      console.log(res);
    });

    this.apiServiceProfile.getFutureUserRoutesAsPassenger().subscribe( res => {
      this.futureRoutesAsPassenger = res;
      console.log(res);
    });
  }

  viewOnMap(id) {
    this.navigation.open('/profile/routes/review/' + id);
  }

  openPassedRoutes() {
    this.navigation.open('/profile/routes/passed');
  }
}
