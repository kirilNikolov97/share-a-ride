import {User} from './user.model';
import {Address} from './address.model';
import {PassengerEnum} from './passenger-enum.model';

export class RouteStop {
  id: string;
  routeId: number;
  address: Address;
  userId: User;
  passengerEnum: PassengerEnum;
  approved: boolean;

  constructor() {
    this.id = null;
    this.routeId = null;
    this.address = null;
    this.userId = null;
    this.passengerEnum = null;
    this.approved = null;
  }
}
