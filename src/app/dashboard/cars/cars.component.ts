import { Component, OnInit } from '@angular/core';
import {Car} from '../../model/car.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {NavigationService} from '../../_services/navigation.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];

  constructor(private apiServiceProfile: ProfileApiService, private navigation: NavigationService) { }

  ngOnInit() {
    this.apiServiceProfile.getCars().subscribe(res => {
      this.cars = res;
    });
  }

  deleteCar(id) {
    this.apiServiceProfile.deleteCar(id).subscribe(res => {
      console.log(res);
    });
  }
}
