import { Component, OnInit } from '@angular/core';
import {Car} from '../../../model/car.model';
import {Address} from '../../../model/address.model';
import {Route} from '../../../model/route.model';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {NgForm} from '@angular/forms';
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  route: Route;
  cars: Car[];
  addresses: Address[];
  selectedAddress: Address;
  selectedCar: Car;
  date: Date = new Date(Date.now());
  today: Date = new Date(Date.now());
  officeDirection: boolean;
  isValidFormSubmitted = false;
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    if (!this.tokenStorageService.getUser().driver) {
      this.navigation.open('profile');
      return;
    }
    this.date.setHours(this.date.getHours() + 1);
    this.today.setHours(this.today.getHours() + 1);

    this.officeDirection = true;
    this.selectedCar = new Car();
    this.selectedAddress = new Address();

    this.apiServiceProfile.getCars().subscribe( res => {
      this.cars = res;
    });

    this.apiServiceProfile.getAddresses().subscribe( res => {
      this.addresses = res;
    });
  }

  setOfficeDirection(direction) {
    this.officeDirection = direction;
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (!this.selectedAddress.id || !this.selectedCar.id) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.addRoute(this.date, this.selectedCar.id, this.selectedAddress.id, this.officeDirection).subscribe(
      res => {
        this.errorMessage = '';
        this.navigation.open('/profile/routes');
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}
