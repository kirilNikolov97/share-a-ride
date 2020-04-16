import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './dashboard/profile/profile.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {ProfileInfoComponent} from './dashboard/profile-info/profile-info.component';
import {AddressComponent} from './dashboard/address/address.component';
import {CreateAddressComponent} from './dashboard/address/create-address/create-address.component';
import {EditAddressComponent} from './dashboard/address/edit-address/edit-address.component';
import {CarsComponent} from './dashboard/cars/cars.component';
import {CreateCarComponent} from './dashboard/cars/create-car/create-car.component';
import {EditCarComponent} from './dashboard/cars/edit-car/edit-car.component';
import {CreateRouteComponent} from './dashboard/route/create-route/create-route.component';
import {EditRouteComponent} from './dashboard/route/edit-route/edit-route.component';
import {RouteComponent} from './dashboard/route/route.component';
import {BecomeDriverComponent} from './dashboard/become-driver/become-driver.component';
import {RoutePageComponent} from './route-page/route-page.component';
import {AllRoutesComponent} from './all-routes/all-routes.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ReviewRouteComponent} from './dashboard/route/review-route/review-route.component';
import {PassedRoutesComponent} from './dashboard/route/passed-routes/passed-routes.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {AuthGuard} from './_services/auth.guard';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: AllRoutesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'profile/info', canActivate: [AuthGuard], component: ProfileInfoComponent },
  { path: 'profile/address', canActivate: [AuthGuard], component: AddressComponent },
  { path: 'profile/address/create', canActivate: [AuthGuard], component: CreateAddressComponent },
  { path: 'profile/address/edit/:id', canActivate: [AuthGuard], component: EditAddressComponent },
  { path: 'profile/cars', canActivate: [AuthGuard], component: CarsComponent },
  { path: 'profile/cars/create', canActivate: [AuthGuard], component: CreateCarComponent },
  { path: 'profile/cars/edit/:id', canActivate: [AuthGuard], component: EditCarComponent},
  { path: 'profile/routes', canActivate: [AuthGuard], component: RouteComponent},
  { path: 'profile/routes/create', canActivate: [AuthGuard], component: CreateRouteComponent},
  { path: 'profile/routes/edit/:id', canActivate: [AuthGuard], component: EditRouteComponent},
  { path: 'profile/routes/review/:id', canActivate: [AuthGuard], component: ReviewRouteComponent},
  { path: 'profile/routes/passed', canActivate: [AuthGuard], component: PassedRoutesComponent},
  { path: 'profile/become-driver', canActivate: [AuthGuard], component: BecomeDriverComponent},
  { path: 'route/:id', canActivate: [AuthGuard], component: RoutePageComponent},
  { path: 'all-routes', canActivate: [AuthGuard], component: AllRoutesComponent},
  { path: 'statistics', canActivate: [AuthGuard], component: StatisticsComponent},
  { path: 'view-profile/:id', canActivate: [AuthGuard], component: ViewProfileComponent},
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
