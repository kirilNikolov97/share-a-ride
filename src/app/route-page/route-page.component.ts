import { Component, OnInit } from '@angular/core';
import {Route} from '../model/route.model';
import {Car} from '../model/car.model';
import {RouteStop} from '../model/route-stops.model';
import {Address} from '../model/address.model';
import {ActivatedRoute} from '@angular/router';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {NavigationService} from '../_services/navigation.service';

@Component({
  selector: 'app-route-page',
  templateUrl: './route-page.component.html',
  styleUrls: ['./route-page.component.css']
})
export class RoutePageComponent implements OnInit {

  route: Route;
  routeId: string;
  car: Car;
  routeStops: RouteStop[];
  startAddressRoute: Address;
  userAddresses: Address[];
  selectedAddress: Address;
  errorMessage: '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigation: NavigationService,
    private apiServiceProfile: ProfileApiService
  ) { }

  ngOnInit() {
    this.route = new Route();
    this.car = new Car();
    this.startAddressRoute = new Address();

    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiServiceProfile.getRouteById(this.routeId).subscribe( res => {
      this.route = res;
      this.car = res.car;
      this.startAddressRoute = res.routeStops[0].address;
      console.log(res);
    });

    this.apiServiceProfile.getAddresses().subscribe( res => {
      this.userAddresses = res;
    });
  }

  onSubmit() {
    this.apiServiceProfile.saveSeat(this.selectedAddress.id, this.routeId).subscribe(
      res => {
        this.navigation.open('/');
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}
