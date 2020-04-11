import { Component, OnInit } from '@angular/core';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {Car} from '../../../model/car.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  car: Car;
  isValidFormSubmitted = false;
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.car = new Car();
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.createCar(this.car).subscribe(
      res => {
        this.errorMessage = '';
        this.navigation.open('profile/cars');
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}
