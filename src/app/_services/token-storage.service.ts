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
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveCompany(company) {
    window.sessionStorage.removeItem(COMPANY_KEY);
    window.sessionStorage.setItem(COMPANY_KEY, JSON.stringify(company));
  }

  public getCompany(): User {
    return JSON.parse(sessionStorage.getItem(COMPANY_KEY));
  }
}
