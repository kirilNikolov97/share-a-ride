import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Route} from '../model/route.model';
import {RouteStop} from '../model/route-stops.model';
import {HomeApiService} from '../_services/api/home-api.service';
import {NavigationService} from '../_services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastRoutes: Route[];
  rows: HomePageRowData[];

  constructor(private apiServiceHome: HomeApiService,
              private navigation: NavigationService) { }

  ngOnInit() {
    this.apiServiceHome.getLastRoutes(10).subscribe( res => {
      this.lastRoutes = res;
      console.log(res);
      this.fetchRowsData(res);
    });
  }

  fetchRowsData(dataRows: Route[]) {
    this.rows = [];
    dataRows.forEach(value => {
      const row: HomePageRowData = new HomePageRowData();
      row.id = value.id;
      row.date = value.dateRoute.toString().split('T')[0];
      row.time = value.dateRoute.toString().split('T')[1];
      row.carName = value.car.manufacturer + ' ' + value.car.model + ' ' + value.car.year;
      row.officeDirection = value.officeDirection;
      const startFrom: RouteStop = value.routeStops[0];
      row.driverId = startFrom.userId.id;
      row.driverName = startFrom.userId.username;
      row.fromWhere = startFrom.address.district;
      this.rows.push(row);
    });

  }
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
