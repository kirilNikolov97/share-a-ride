import {Component, OnInit} from '@angular/core';
import {TopUser} from '../model/dto/top-user';
import {ProfileApiService} from '../_services/api/profile-api.service';
import {NavigationService} from '../_services/navigation.service';
import {ChartDataModel} from '../model/charts-data-models/chart-data.model';
import {LinearDataModel} from '../model/charts-data-models/liner-data.model';
import {Route} from '../model/route.model';
import {PassengerEnum} from '../model/passenger-enum.model';
import {MapsAPILoader} from '@agm/core';
import {Address} from '../model/address.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  topUsers: TopUser[];
  cnt: number;
  routes: Route[];
  sharedRidesInKm: number;
  sum = 0;

  startDate = new Date(Date.now());
  endDate = new Date(Date.now());

  // Pie Chart
  pieChartData: ChartDataModel[];
  pieChartView: any[] = [600, 400];
  showLegend = true;
  showLabels = true;

  // Horizontal graphic
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  yAxisLabel = 'Username';
  showYAxisLabel = true;
  xAxisLabel = 'Passengers';
  horizontalChartSortedByPassengers: ChartDataModel[];
  horizontalChartSortedByDrives: ChartDataModel[];
  horizontalChartSortedByRating: ChartDataModel[];

  colorScheme = {
    domain: ['#0069c0', '#6ec6ff', '#BDBDBD']
  };


  constructor(
    private apiServiceProfile: ProfileApiService,
    private navigation: NavigationService,
    private mapsAPILoader: MapsAPILoader
  ) { }

  // TODO: refactor
  ngOnInit() {
    this.cnt = 0;

    this.apiServiceProfile.getPieChartDriversData().subscribe(res => {
      this.pieChartData = res;
    });

    this.startDate.setDate(this.startDate.getDate() - 7);

    this.apiServiceProfile.getTop15Users().subscribe(res => {
      this.topUsers = res;
      let currData: ChartDataModel[];
      currData = [];

      for (const i of this.topUsers) {
        const data = new ChartDataModel();
        data.name = i.user.username;
        data.value = i.passengersNumber;
        currData.push(data);
      }
      this.horizontalChartSortedByPassengers = currData;

      this.topUsers.sort(((a, b) => b.passengersNumber - a.passengersNumber));
    });

    this.apiServiceProfile.getTop15UsersByDrives().subscribe(res => {
      const currUsers = res;
      const currData = [];
      for (const i of currUsers) {
        const data = new ChartDataModel();
        data.name = i.user.username;
        data.value = i.numberRides;
        currData.push(data);
      }
      this.horizontalChartSortedByDrives = currData;
    });

    this.apiServiceProfile.getTop15UsersByRating().subscribe(res => {
      this.horizontalChartSortedByRating = this.getSortedByRating(res);
    });

    // this.apiServiceProfile.getAllRoutes().subscribe(res => {
    //   this.routes = res;
    //   this.calculateKm(this.routes);
    // });
  }

  private calculateKm(res: Route[]) {
    this.sum = 0;
    this.mapsAPILoader.load().then(() => {
    for (const route of res) {

        if (route.routeStops.length > 1) {
          let address: Address;
          this.apiServiceProfile.getAddressById(route.officeAddressId).subscribe(addrs => {
            address = addrs;

            let officeAddressMaps = new google.maps.LatLng(address.latitude, address.longitude);
            route.routeStops.filter(rs => rs.passengerEnum !== PassengerEnum.DRIVER).forEach(rs => {
              let tmp = new google.maps.LatLng(rs.address.latitude, rs.address.longitude);
              this.sum += google.maps.geometry.spherical.computeDistanceBetween(officeAddressMaps, tmp);
            });
            this.sharedRidesInKm = this.sum * 0.001;
          });
        }
      }
    });
  }

  private getSortedByRating(topUsers: TopUser[]) {
    const topUsersByRating = topUsers.filter(x => x.rating !== 0);
    topUsersByRating.sort(((a, b) => b.rating - a.rating));

    const currData = [];
    for (const i of topUsersByRating) {
      const data = new ChartDataModel();
      data.name = i.user.username;
      data.value = i.rating;
      currData.push(data);
    }
    return currData;
  }

  openProfile(id: string) {
    this.navigation.open('/view-profile/' + id);
  }

  orderByDrives() {
    this.apiServiceProfile.getTop15UsersByDrives().subscribe(res => {
      this.topUsers = res;
    });
  }

  orderByPassengers() {
    this.apiServiceProfile.getTop15Users().subscribe(res => {
      this.topUsers = res;
    });
  }

  orderByRating() {
    this.apiServiceProfile.getTop15UsersByRating().subscribe(res => {
      this.topUsers = res;
    });
  }
}
