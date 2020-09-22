import { Component, OnInit } from '@angular/core';
import {Route} from '../../../model/route.model';
import {Car} from '../../../model/car.model';
import {Address} from '../../../model/address.model';
import {ActivatedRoute} from '@angular/router';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  route: Route;
  cars: Car[];
  selectedCar: Car;
  addresses: Address[];
  selectedAddress: Address;
  routeId: string;
  date: Date = new Date ();
  today: Date = new Date(Date.now());
  officeDirection: boolean;
  isValidFormSubmitted = false;
  selectedCompanyAddress: Address;
  companyAddresses: Address[];
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    if (!this.tokenStorageService.getUser().driver) {
      this.navigation.open('/');
      return;
    }

    this.officeDirection = false;
    this.route = new Route();
    this.selectedAddress = new Address();
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiServiceProfile.getRouteByIdValidate(this.routeId).subscribe(
      res => {
        this.route = res;
        this.date = res.dateRoute;
        this.selectedCar = res.car;
        this.selectedAddress = res.routeStops.find(x => x.passengerEnum.toString() === 'DRIVER').address;
        this.officeDirection = res.officeDirection;

        this.apiServiceProfile.getAddresses().subscribe( add => {
          this.addresses = add;
        });

        this.apiServiceProfile.getCars().subscribe( cars => {
          this.cars = cars;
        });

        this.apiServiceProfile.getCompanyAddresses().subscribe(add2 => {
          this.companyAddresses = add2;
          this.selectedCompanyAddress = this.companyAddresses.find(x => x.id === res.officeAddressId);
        });

      }, err => {
        this.navigation.open('profile');
      });
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

    this.apiServiceProfile.updateFutureRoute(this.selectedCar.id, this.selectedAddress.id,
      this.routeId, this.date, this.officeDirection, this.selectedCompanyAddress.id).subscribe(
        res => {
        this.navigation.open('/profile/routes');
      }, err => {
        this.errorMessage = 'Something went wrong.';
      });
  }
}
