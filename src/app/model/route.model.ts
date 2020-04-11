import {Car} from './car.model';
import {RouteStop} from './route-stops.model';

export class Route {

  id: number;
  dateRoute: Date;
  car: Car;
  officeDirection: boolean;
  routeStops: RouteStop[];

  constructor() {
    this.id = null;
    this.dateRoute = null;
    this.car = null;
    this.officeDirection = null;
    this.routeStops = [];
  }

}
