import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  open(link: string) {
    this.router.navigate([link]);
  }

  openWithQueryParams(link: string, params) {
    this.router.navigate([link], {queryParams: params});
  }

  reload() {
    location.reload();
  }
}
