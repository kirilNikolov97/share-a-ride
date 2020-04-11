import { Component, OnInit } from '@angular/core';
import {Route} from '../../../model/route.model';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {NavigationService} from '../../../_services/navigation.service';
import {ProfileApiService} from '../../../_services/api/profile-api.service';

@Component({
  selector: 'app-passed-routes',
  templateUrl: './passed-routes.component.html',
  styleUrls: ['./passed-routes.component.css']
})
export class PassedRoutesComponent implements OnInit {

  userRoutesAsDriver: Route[];
  userRoutesAsPassenger: Route[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private navigation: NavigationService,
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {

    this.apiServiceProfile.getUserRoutesAsDriver().subscribe( res => {
      this.userRoutesAsDriver = res;
      console.log(res);
    });

    this.apiServiceProfile.getUserRoutesAsPassenger().subscribe( res => {
      this.userRoutesAsPassenger = res;
      console.log(res);
    });
  }

  viewOnMap(id) {
    this.navigation.open('/profile/routes/review/' + id);
  }
}
