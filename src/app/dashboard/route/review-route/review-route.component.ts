import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileApiService} from '../../../_services/api/profile-api.service';
import {NavigationService} from '../../../_services/navigation.service';
import {Route} from '../../../model/route.model';
import {MapsAPILoader} from '@agm/core';
import {PassengerEnum} from '../../../model/passenger-enum.model';
import DirectionsService = google.maps.DirectionsService;
import DirectionsRenderer = google.maps.DirectionsRenderer;
import {TokenStorageService} from '../../../_services/token-storage.service';
import {RouteStop} from '../../../model/route-stops.model';


@Component({
  selector: 'app-review-route',
  templateUrl: './review-route.component.html',
  styleUrls: ['./review-route.component.css']
})
export class ReviewRouteComponent implements OnInit {
  private route: Route;
  private routeId: string;
  directionsService: DirectionsService;
  directionsDisplay: DirectionsRenderer;
  officeLat: number;
  officeLng: number;
  private mapLat = 41.85;
  private mapLng = 22.65;
  private notApprovedRouteStopId: string;
  private notApprovedRouteStop: RouteStop;

  @ViewChild('map', {static: false})
  public map: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private mapsAPILoader: MapsAPILoader,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit() {
    this.officeLat = this.tokenStorage.getCompany().addresses[0].latitude;
    this.officeLng = this.tokenStorage.getCompany().addresses[0].longitude;

    this.notApprovedRouteStopId = this.activatedRoute.snapshot.queryParamMap.get('routeStopId');
    if (this.notApprovedRouteStopId != null) {
      this.notApprovedRouteStop = new RouteStop();
      this.apiServiceProfile.getRouteStopById(this.notApprovedRouteStopId).subscribe( res => {
        this.notApprovedRouteStop = res;
      });
    }

    this.route = new Route();
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiServiceProfile.getRouteById(this.routeId).subscribe(res => {
      this.route = res;
      this.mapsAPILoader.load().then(() => {
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: this.mapLat, lng: this.mapLng}
        });
        this.directionsDisplay.setMap(map);
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
      });
    });

  }

  private calculateAndDisplayRoute(directionsService, directionsDisplay) {

    var waypts = [];
    var stops = this.route.routeStops;
    var originLatitude;
    var originLongitude;


    for (var i = 0; i < stops.length; i++) {
      if (stops[i].passengerEnum.toString() === PassengerEnum[0].toString()) {
        originLatitude = stops[i].address.latitude;
        originLongitude = stops[i].address.longitude;
      } else {
        if (stops[i].approved) {
          waypts.push({
            location: new google.maps.LatLng(stops[i].address.latitude, stops[i].address.longitude),
            stopover: true
          });
        }
      }
    }

    if (this.notApprovedRouteStopId != null) {
      waypts.push({
        location: new google.maps.LatLng(this.notApprovedRouteStop.address.latitude, this.notApprovedRouteStop.address.longitude),
        stopover: true
      });
    }

    if (this.route.officeDirection) {
      directionsService.route({
        origin: new google.maps.LatLng(originLatitude, originLongitude),
        destination: {lat: this.officeLat, lng:  this.officeLng},
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    } else {
      directionsService.route({
        origin: {lat: this.officeLat, lng:  this.officeLng},
        destination: new google.maps.LatLng(originLatitude, originLongitude),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }


  }

}
