import {City} from './city.model';

export class Address {

  id: string;
  city: City;
  district: string;
  street: string;
  additionalInfo: string;
  latitude: number;
  longitude: number;

  constructor() {
    this.id = null;
    this.city = null;
    this.district = null;
    this.street = null;
    this.additionalInfo = null;
  }

}
