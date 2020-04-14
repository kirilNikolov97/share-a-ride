import { Injectable } from '@angular/core';
import {User} from '../model/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const COMPANY_KEY = 'company';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public saveCompany(company) {
    window.localStorage.removeItem(COMPANY_KEY);
    window.localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
  }

  public getCompany(): User {
    return JSON.parse(localStorage.getItem(COMPANY_KEY));
  }
}
