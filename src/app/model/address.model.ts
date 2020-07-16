export class Address {

  id: string;
  district: string;
  street: string;
  additionalInfo: string;
  latitude: number;
  longitude: number;
  deleted: boolean;

  constructor() {
    this.id = null;
    this.district = null;
    this.street = null;
    this.additionalInfo = null;
    this.deleted = null;
  }

}
