import { Component, OnInit } from '@angular/core';
import {Route} from '../../../model/route.model';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {NavigationService} from '../../../_services/navigation.service';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {Address} from '../../../model/address.model';

@Component({
  selector: 'app-passed-routes',
  templateUrl: './passed-routes.component.html',
  styleUrls: ['./passed-routes.component.css']
})
export class PassedRoutesComponent implements OnInit {

  sortByPassenger: string;
  sortByDriver: string;
  limitPassenger = 10;
  limitDriver = 10;
  userRoutesAsDriver: Route[];
  userRoutesAsPassenger: Route[];
  companyAddresses: Address[];

  constructor(
    public tokenStorageService: TokenStorageService,
    private navigation: NavigationService,
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {

    this.apiServiceProfile.getCompanyAddresses().subscribe(res => {
      this.companyAddresses = res;
    });

    this.apiServiceProfile.getUserRoutesAsDriver(this.sortByDriver, this.limitDriver).subscribe( res => {
      this.userRoutesAsDriver = res;
    });

    this.apiServiceProfile.getUserRoutesAsPassenger(this.sortByPassenger, this.limitPassenger).subscribe( res => {
      this.userRoutesAsPassenger = res;
    });
  }

  sortByDateAsDriver() {
    if (!this.sortByDriver) {
      this.sortByDriver = 'date_desc';
    } else if (this.sortByDriver === 'date_desc') {
      this.sortByDriver = 'date_asc';
    } else {
      this.sortByDriver = 'date_desc';
    }
    this.apiServiceProfile.getUserRoutesAsDriver(this.sortByDriver, this.limitDriver).subscribe( res => {
      this.userRoutesAsDriver = res;
    });
  }

  showAllPastRoutesAsDriver() {
    this.limitDriver = -1;
    this.apiServiceProfile.getUserRoutesAsDriver(this.sortByDriver, this.limitDriver).subscribe( res => {
      this.userRoutesAsDriver = res;
    });
  }

  showAllPastRoutesAsPassenger() {
    this.limitPassenger = -1;
    this.apiServiceProfile.getUserRoutesAsPassenger(this.sortByPassenger, this.limitPassenger).subscribe( res => {
      this.userRoutesAsPassenger = res;
    });
  }

  viewOnMap(id) {
    this.navigation.open('/profile/routes/review/' + id);
  }

  sortByDateAsPassenger() {
    if (!this.sortByPassenger) {
      this.sortByPassenger = 'date_desc';
    } else if (this.sortByPassenger === 'date_desc') {
      this.sortByPassenger = 'date_asc';
    } else {
      this.sortByPassenger = 'date_desc';
    }
    this.apiServiceProfile.getUserRoutesAsPassenger(this.sortByPassenger, this.limitPassenger).subscribe( res => {
      this.userRoutesAsPassenger = res;
    });
  }

  findAddressById(officeAddressId: string): string {
    for (let i of this.companyAddresses) {
      if (officeAddressId === i.id) {
        return i.district + ' ' + i.street;
      }
    }
  }

  openProfile(driverId) {
    this.navigation.open('/view-profile/' + driverId);
  }
}
