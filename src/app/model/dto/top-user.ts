import {User} from '../user.model';

export class TopUser {
  user: User;
  numberRides: number;

  constructor() {
    this.user = null;
    this.numberRides = null;
  }
}
