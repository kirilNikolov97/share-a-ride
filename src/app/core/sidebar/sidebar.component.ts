import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {NavigationService} from '../../_services/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public tokenStorageService: TokenStorageService,
    public navigation: NavigationService
  ) { }

  ngOnInit() {
  }

}
