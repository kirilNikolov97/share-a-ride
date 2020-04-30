import {User} from '../user.model';

export class TopUser {
  user: User;
  numberRides: number;
  passengersNumber: number;
  rating: number;

  constructor() {
    this.user = null;
    this.numberRides = null;
    this.passengersNumber = null;
    this.rating = null;
  }
}
