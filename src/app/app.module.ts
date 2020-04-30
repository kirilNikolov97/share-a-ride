import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { ProfileInfoComponent } from './dashboard/profile-info/profile-info.component';
import { AddressComponent } from './dashboard/address/address.component';
import { CreateAddressComponent } from './dashboard/address/create-address/create-address.component';
import { EditAddressComponent } from './dashboard/address/edit-address/edit-address.component';
import { RouteComponent } from './dashboard/route/route.component';
import { CarsComponent } from './dashboard/cars/cars.component';
import { CreateCarComponent } from './dashboard/cars/create-car/create-car.component';
import { EditCarComponent } from './dashboard/cars/edit-car/edit-car.component';
import { CreateRouteComponent } from './dashboard/route/create-route/create-route.component';
import { EditRouteComponent } from './dashboard/route/edit-route/edit-route.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { BecomeDriverComponent } from './dashboard/become-driver/become-driver.component';
import { RoutePageComponent } from './route-page/route-page.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { AgmCoreModule } from '@agm/core';
import { StatisticsComponent } from './statistics/statistics.component';
import {ReviewRouteComponent} from './dashboard/route/review-route/review-route.component';
import { PassedRoutesComponent } from './dashboard/route/passed-routes/passed-routes.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {AuthGuard} from './_services/auth.guard';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    SidebarComponent,
    ProfileInfoComponent,
    AddressComponent,
    CreateAddressComponent,
    EditAddressComponent,
    RouteComponent,
    CarsComponent,
    CreateCarComponent,
    EditCarComponent,
    CreateRouteComponent,
    EditRouteComponent,
    BecomeDriverComponent,
    RoutePageComponent,
    AllRoutesComponent,
    StatisticsComponent,
    ReviewRouteComponent,
    PassedRoutesComponent,
    ViewProfileComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXtPvQGtMNUhR0FA4BEo2y45fg3ZarYC4',
      libraries: ['places', 'geometry']
    }),
    NgxChartsModule
  ],
  providers: [authInterceptorProviders, MatDatepickerModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
