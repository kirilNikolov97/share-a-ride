import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Address} from '../../../model/address.model';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {MapsAPILoader} from '@agm/core';
import {City} from '../../../model/city.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  addressClass: Address;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  cities: City[];
  errorMessage = '';
  isValidFormSubmitted = false;


  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.addressClass = new Address();

    this.apiServiceProfile.getAllCities().subscribe(res => {
      this.cities = res;
    });

    this.chooseFromMaps();
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  chooseFromMaps() {
    this.address = 'Loading...';

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      }, (err) => {
        this.longitude = 23.3227;
        this.latitude = 42.69774208138145;
        this.zoom = 11;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          let arr = this.address.split(',');
          this.addressClass.street = arr[0];
          this.addressClass.district = arr[1].trim();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.addressClass.latitude = this.latitude;
    this.addressClass.longitude = this.longitude;
    this.apiServiceProfile.createAddress(this.addressClass).subscribe(
      res => {
        this.navigation.open('profile/address');
      }, err => {
        this.errorMessage = err.error.message;
      });
  }

}
