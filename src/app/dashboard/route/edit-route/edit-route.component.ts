import { Component, OnInit } from '@angular/core';
import {Route} from '../../../model/route.model';
import {Car} from '../../../model/car.model';
import {Address} from '../../../model/address.model';
import {ActivatedRoute} from '@angular/router';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  route: Route;
  cars: Car[];
  addresses: Address[];
  selectedAddress: Address;
  selectedCar: Car;
  routeId: string;
  date: Date = new Date ();
  today: Date = new Date(Date.now());
  officeDirection: boolean;
  isValidFormSubmitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.officeDirection = false;
    this.route = new Route();
    this.selectedAddress = new Address();
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiServiceProfile.getRouteById(this.routeId).subscribe( res => {
      this.route = res;
      this.date = res.dateRoute;
      this.selectedCar = res.car;
      this.selectedAddress = res.routeStops[0].address;
      this.officeDirection = res.officeDirection;
    });

    this.apiServiceProfile.getAddresses().subscribe( res => {
      this.addresses = res;
      console.log(res);
    });

    this.apiServiceProfile.getCars().subscribe( res => {
      this.cars = res;
    });

    console.log(' Selected address ' + this.selectedAddress);
  }

  changeDirection() {
    this.officeDirection = !this.officeDirection;
  }

  cancelRoute() {
    this.apiServiceProfile.cancelRoute(this.routeId).subscribe( res => {
      this.navigation.open('/profile/routes');
    });
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (!this.selectedAddress.id || !this.selectedCar.id) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.updateFutureRoute(this.selectedCar.id, this.selectedAddress.id, this.routeId, this.date, this.officeDirection).subscribe( res => {
      this.navigation.open('/profile/routes');
    });
  }
}
