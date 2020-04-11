import {User} from './user.model';

export class Car {

  id: number;
  user: User;
  manufacturer: string;
  model: string;
  seats: number;
  year: number;
  color: string;

  constructor() {
    this.id = null;
    this.user = null;
    this.manufacturer = null;
    this.model = null;
    this.seats = null;
    this.year = null;
    this.color = null;
  }

}
