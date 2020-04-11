import {Permission} from './permission.model';

export class Role {

  id: number;
  name: string;
  permissions: Permission[];

  constructor() {
    this.id = null;
    this.name = null;
    this.permissions = null;
  }

}
