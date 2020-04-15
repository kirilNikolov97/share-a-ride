import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {NavigationService} from '../../_services/navigation.service';
import {Route} from '../../model/route.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {RouteStop} from '../../model/route-stops.model';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  futureRoutesAsDriver: Route[];
  futureRoutesAsPassenger: Route[];
  combinedFutureRoutesAsDriver: CombinedData[];
  combinedFutureRoutesAsPassenger: CombinedData[];
  errorMessage = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private navigation: NavigationService,
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {
    this.tokenStorageService.saveSelectedMenuSidebar('route');

    this.combinedFutureRoutesAsPassenger = [];
    this.combinedFutureRoutesAsDriver = [];
    this.apiServiceProfile.getFutureUserRoutesAsDriver().subscribe( res => {
      this.futureRoutesAsDriver = res;
      for (let i = 0; i < this.futureRoutesAsDriver.length; i++) {
        this.combinedFutureRoutesAsDriver.push(new CombinedData(this.futureRoutesAsDriver[i], this.futureRoutesAsDriver[i].routeStops.find(x => {
          return x.userId.username === this.tokenStorageService.getUser().username;
        })));
      }
    });

    this.apiServiceProfile.getFutureUserRoutesAsPassenger().subscribe( res => {
      this.futureRoutesAsPassenger = res;
      for (let i = 0; i < this.futureRoutesAsPassenger.length; i++) {
        this.combinedFutureRoutesAsPassenger.push(new CombinedData(this.futureRoutesAsPassenger[i], this.futureRoutesAsPassenger[i].routeStops.find(x => {
          return x.userId.username === this.tokenStorageService.getUser().username;
        })));
      }
    });
  }

  viewOnMap(id) {
    this.navigation.open('/profile/routes/review/' + id);
  }

  openPassedRoutes() {
    this.navigation.open('/profile/routes/passed');
  }

  deleteRouteStop(userRouteStop: RouteStop) {
    this.apiServiceProfile.deleteRouteStopById(userRouteStop.id).subscribe(
      res => {
        this.navigation.reload();
        this.errorMessage = '';
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}

// TODO: change name
export class CombinedData {
  route: Route;
  userRouteStop: RouteStop;

  constructor(route: Route, userRouteStop: RouteStop) {
    this.route = route;
    this.userRouteStop = userRouteStop;
  }
}
