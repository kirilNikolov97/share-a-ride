import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route} from '../../model/route.model';

// const API_URL = 'http://localhost:8080';
const API_URL = 'https://share-a-ride-nbu.herokuapp.com';

const headers = {
  'Content-type': 'application/json'
};

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private http: HttpClient) { }

  getLastRoutes(limit) {
    return this.http.get<Route[]>(API_URL + '/lastRoutes' + '?limit=' + limit);
  }
}
