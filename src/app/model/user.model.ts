import {Address} from './address.model';
import {Car} from './car.model';
import {Rating} from './rating.model';

export class User {
  id: string;
  username: string;
  enabled: boolean;
  accountExpired: boolean;
  credentialExpired: boolean;
  accountLocked: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  driver: boolean;
  roles: string[];
  addresses: Address[];
  cars: Car[];
  ratings: Rating[];

  constructor() {
    this.id = null;
    this.username = null;
    this.enabled = null;
    this.accountExpired = null;
    this.credentialExpired = null;
    this.accountLocked = null;
    this.firstName = null;
    this.lastName = null;
    this.phone = null;
    this.email = null;
    this.driver = null;
    this.roles = null;
    this.addresses = null;
    this.cars = null;
    this.ratings = null;
  }

}
