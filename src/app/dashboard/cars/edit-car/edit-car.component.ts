import { Component, OnInit } from '@angular/core';
import {Car} from '../../../model/car.model';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car: Car;
  carId: string;
  isValidFormSubmitted = false;
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    if (!this.tokenStorageService.getUser().driver) {
      this.navigation.open('profile');
      return;
    }

    this.car = new Car();
    this.carId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiServiceProfile.getCarById(this.carId).subscribe( res => {
      this.car = res;
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.apiServiceProfile.updateCar(this.car).subscribe(
      res => {
        this.errorMessage = '';
        this.navigation.open('profile/cars');
      }, err => {
        this.errorMessage = err.error.message;
        if (this.errorMessage === '') {
          this.errorMessage = 'Please fill all necessary fields.';
        }
      });
  }
}
