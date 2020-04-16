import { Component, OnInit } from '@angular/core';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {Route} from '../model/route.model';
import {RouteStop} from '../model/route-stops.model';
import {Router} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material';
import {TopUser} from '../model/dto/top-user';
import {NavigationService} from '../_services/navigation.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css']
})
export class AllRoutesComponent implements OnInit {

  currentPage: number;
  allPages: number;
  sortBy: string;
  rows: HomePageRowData[];
  date: Date;
  minDate: Date;
  dateRange: DateRange;
  topUsers: TopUser[];
  officeDirection: boolean;
  fromDate: Date;
  toDate: Date;

  constructor(
    private apiServiceProfile: ProfileApiService,
    private router: Router,
    private navigation: NavigationService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.minDate = new Date(Date.now());
    this.dateRange = new DateRange();

    this.apiServiceProfile.getTop15Users().subscribe(res => {
      this.topUsers = res;
    });

    if (this.sortBy && this.currentPage) {
      this.apiServiceProfile.getLastRoutes(this.currentPage, this.sortBy, 'dummy_filter').subscribe( res => {
        this.fetchRowsData(res);
      });
    } else if (this.sortBy && !this.currentPage) {
      this.currentPage = 1;
      this.apiServiceProfile.getLastRoutes(this.currentPage, this.sortBy, 'dummy_filter').subscribe( res => {
        this.fetchRowsData(res);
      });
    } else {
      this.currentPage = 1;
      this.apiServiceProfile.getLastRoutes(this.currentPage, '', 'dummy_filter').subscribe( res => {
        this.fetchRowsData(res);
      });
    }
  }

  fetchRowsData(dataRows: Route[]) {
    this.rows = [];
    dataRows.forEach(value => {
      const row: HomePageRowData = new HomePageRowData();
      row.id = value.id;
      row.date = value.dateRoute.toString().split('T')[0];
      row.time = value.dateRoute.toString().split('T')[1];
      row.carName = value.car.manufacturer + ' ' + value.car.model + ' ' + value.car.year;
      const startFrom: RouteStop = value.routeStops.find(x => x.passengerEnum.toString() === 'DRIVER');
      row.officeDirection = value.officeDirection;
      row.driverId = startFrom.userId.id;
      row.driverName = startFrom.userId.username;
      row.fromWhere = startFrom.address.district;
      this.rows.push(row);
    });
  }

  goToPage(page: number) {
    this.currentPage = page;

    this.apiServiceProfile.filterByDirection(page, this.sortBy, 'dummy_filter', this.dateRange, this.officeDirection).subscribe(res => {
      this.fetchRowsData(res);
    });
  }

  goNextPage() {
    this.goToPage(this.currentPage + 1);
  }

  sort(mySort: string) {
    this.sortBy = mySort;

    this.apiServiceProfile.filterByDirection(this.currentPage, this.sortBy, 'dummy_filter', this.dateRange, this.officeDirection).subscribe(res => {
      this.fetchRowsData(res);
    });
  }

  changeStartDate(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateRange.startDate = $event.value;
  }
  changeEndDate(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateRange.endDate = $event.value;
  }

  filterRoutesByDates() {
    this.apiServiceProfile.filterByDirection(this.currentPage, this.sortBy, 'dummy_filter', this.dateRange, this.officeDirection).subscribe(res => {
      this.fetchRowsData(res);
    });
  }

  filterByDirection(passedOfficeDirection) {
    this.officeDirection = passedOfficeDirection;
    this.apiServiceProfile.filterByDirection(this.currentPage, this.sortBy, 'dummy_filter', this.dateRange, passedOfficeDirection).subscribe(res => {
      this.fetchRowsData(res);
    });
  }

  filterAndSort() {
    this.apiServiceProfile.filterByDirection(this.currentPage, this.sortBy, 'dummy_filter', this.dateRange, this.officeDirection).subscribe(res => {
      this.fetchRowsData(res);
    });
  }

  clearFilterAndSort() {
    this.dateRange = new DateRange();
    this.officeDirection = null;
    this.apiServiceProfile.getLastRoutes(this.currentPage, '', 'dummy_filter').subscribe( res => {
      this.fetchRowsData(res);
    });
    this.fromDate = null;
    this.toDate = null;
  }


  viewOnMap(id) {
    this.navigation.open('/profile/routes/review/' + id);
  }

  openProfile(driverId) {
    this.navigation.open('/view-profile/' + driverId);
  }
}


export class DateRange {
  startDate: Date;
  endDate: Date;
}

export class HomePageRowData {
  id: number;
  date: string;
  time: string;
  carName: string;
  driverId: string;
  driverName: string;
  fromWhere: string;
  officeDirection: boolean;
  routeStop: RouteStop;
  toWhere: string;
}
