import { Component, OnInit } from '@angular/core';
import {Address} from '../../model/address.model';
import {ProfileApiService} from '../../_services/api/profile-api.service';
import {NavigationService} from '../../_services/navigation.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[];

  constructor(private apiServiceProfile: ProfileApiService, private navigation: NavigationService) { }

  ngOnInit() {
    this.apiServiceProfile.getAddresses().subscribe(res => {
      console.log(res);
      this.addresses = res;
    });
  }

  deleteAddress(addressId) {
    this.apiServiceProfile.deleteAddress(addressId).subscribe( res => {
      console.log('Address ID: ' + addressId);
    });
    this.navigation.reload();
  }

}
