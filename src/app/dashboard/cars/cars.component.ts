import { Component, OnInit } from '@angular/core';
import {Car} from '../../model/car.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {NavigationService} from '../../_services/navigation.service';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];
  errorMessage = '';

  constructor(
    private apiServiceProfile: ProfileApiService,
    public navigation: NavigationService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    if (!this.tokenStorageService.getUser().driver) {
      this.navigation.open('profile');
      return;
    }

    this.tokenStorageService.saveSelectedMenuSidebar('cars');

    this.apiServiceProfile.getCars().subscribe(res => {
      this.cars = res;
    });
  }

  deleteCar(id) {
    this.apiServiceProfile.deleteCar(id).subscribe(
      res => {
        this.navigation.reload();
      }, err => {
        this.errorMessage = 'This car is assigned to future route and cannot be deleted.';
      });
  }
}
