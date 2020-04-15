import { Component, OnInit } from '@angular/core';
import {Route} from '../model/route.model';
import {RouteStop} from '../model/route-stops.model';
import {HomeApiService} from '../_services/api/home-api.service';
import {NavigationService} from '../_services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiServiceHome: HomeApiService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {}
}
