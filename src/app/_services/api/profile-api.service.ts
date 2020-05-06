import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user.model';
import {Address} from '../../model/address.model';
import {Car} from '../../model/car.model';
import {Route} from '../../model/route.model';
import {TopUser} from '../../model/dto/top-user';
import {City} from '../../model/city.model';
import {PasswordChange} from '../../model/password.change.model';
import {RouteStop} from '../../model/route-stops.model';
import {Rating} from '../../model/rating.model';
import {ChartDataModel} from '../../model/charts-data-models/chart-data.model';
import {LinearDataModel} from '../../model/charts-data-models/liner-data.model';

const API_URL = 'https://share-a-ride-nbu.herokuapp.com';
// const API_URL = 'http://localhost:8080';
const headers = {
  'Content-type': 'application/json'
};

const multipartHeaders = {
  'Content-type': 'multipart/form-data'
};

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User>(API_URL + '/user');
  }

  updateUser(user: User) {
    return this.http.patch<User>(API_URL + '/user', JSON.stringify(user), {headers});
  }

  getAddresses() {
    return this.http.get<Address[]>(API_URL + '/address');
  }

  deleteAddress(addressId) {
    return this.http.delete<Address>(API_URL + '/address?addressId=' + addressId);
  }

  updateAddress(address: Address) {
    return this.http.patch<Address>(API_URL + '/address', JSON.stringify(address), {headers});
  }

  createAddress(address: Address) {
    return this.http.post<Address>( API_URL + '/address', JSON.stringify(address), {headers});
  }

  getAddressById(addressId) {
    return this.http.get<Address>(API_URL + '/address/' + addressId);
  }

  getCars() {
    return this.http.get<Car[]>(API_URL + '/cars');
  }

  deleteCar(carId) {
    return this.http.delete<Address>(API_URL + '/car?carId=' + carId);
  }

  createCar(car: Car) {
    return this.http.post<Car>( API_URL + '/car', JSON.stringify(car), {headers});
  }

  getCarById(carId) {
    return this.http.get<Car>(API_URL + '/car/' + carId);
  }

  updateCar(car: Car) {
    return this.http.patch<Car>(API_URL + '/car', JSON.stringify(car), {headers});
  }

  getUserRoutesAsDriver(sortBy, limit) {
    return this.http.get<Route[]>(API_URL + '/routesAsDriver?sortBy=' + sortBy + '&limit=' + limit + '&username=');
  }

  getUserRoutesAsDriverByUsername(username) {
    return this.http.get<Route[]>(API_URL + '/routesAsDriver?sortBy=&limit=10&username=' + username);
  }

  getFutureUserRoutesAsDriver() {
    return this.http.get<Route[]>(API_URL + '/futureRoutesAsDriver?username=');
  }

  getFutureUserRoutesAsDriverByUserId(username) {
    return this.http.get<Route[]>(API_URL + '/futureRoutesAsDriver?username=' + username);
  }

  getUserRoutesAsPassenger(sortBy, limit) {
    return this.http.get<Route[]>(API_URL + '/routesAsPassenger?sortBy=' + sortBy + '&limit=' + limit);
  }

  getFutureUserRoutesAsPassenger() {
    return this.http.get<Route[]>(API_URL + '/futureRoutesAsPassenger');
  }

  addRoute(date: Date, carId, addressId, officeDirection, companyAddressId) {
    return this.http.post<Route>(API_URL + '/route?carId=' + carId +
      '&addressId=' + addressId + '&officeDirection=' + officeDirection + '&companyAddressId=' + companyAddressId,
      JSON.stringify(date) , {headers});
  }

  getRouteById(routeId) {
    return this.http.get<Route>(API_URL + '/route/' + routeId + '?validate=false');
  }

  getRouteByIdValidate(routeId) {
    return this.http.get<Route>(API_URL + '/route/' + routeId + '?validate=true');
  }


  updateFutureRoute(carId, addressId, routeId, date: Date, officeDirection, officeAddressId) {
    return this.http.patch<Route>(API_URL + '/route?carId=' + carId +
      '&addressId=' + addressId +
      '&routeId=' + routeId +
      '&officeDirection=' + officeDirection +
      '&officeAddressId=' + officeAddressId, JSON.stringify(date) , {headers});
  }

  cancelRoute(routeId) {
    return this.http.patch<Route>(API_URL + '/cancelRoute?routeId=' + routeId, {headers});
  }

  becomeDriver() {
    return this.http.get<User>(API_URL + '/becomeDriver');
  }

  saveSeat(addressId, routeId) {
    return this.http.get<RouteStop>(API_URL + '/saveSeat/' + routeId + '?addressId=' + addressId);
  }

  getLastRoutes(currentPage, sortBy, dummyFilter) {
    return this.http.get<Route[]>(API_URL + '/route/allRoutes'
      + '?currPage=' + currentPage + '&sortBy=' + sortBy + '&filter=' + dummyFilter);
  }

  getAllCities() {
    return this.http.get<City[]>(API_URL + '/cities');
  }

  getCompany() {
    return this.http.get<User>( API_URL + '/company');
  }

  changePass(changePassword: PasswordChange) {
    return this.http.patch<boolean>( API_URL + '/changePassword', JSON.stringify(changePassword), {headers});
  }

  getRouteStopById(notApprovedRouteStopId: string) {
    return this.http.get<RouteStop>(API_URL + '/routeStop/' + notApprovedRouteStopId);
  }

  deleteRouteStopById(routeStopId: string) {
    return this.http.delete<RouteStop>(API_URL + '/routeStop/' + routeStopId);
  }

  approveRouteStop(routeStopId) {
    return this.http.patch<RouteStop>(API_URL + '/approveOrDeclineRouteStop?routeStopId=' + routeStopId + '&approved=true',
      JSON.stringify(new RouteStop()), {headers});
  }

  declineRouteStop(routeStopId) {
    return this.http.patch<RouteStop>(API_URL + '/approveOrDeclineRouteStop?routeStopId=' + routeStopId + '&approved=false',
      JSON.stringify(new RouteStop()), {headers});
  }

  getUserById(userId) {
    return this.http.get<User>(API_URL + '/user/' + userId);
  }

  rateUser(userId, currentRate) {
    return this.http.post<Rating>(API_URL + '/rate?userId=' + userId + '&rating=' + currentRate, JSON.stringify(new Rating()), {headers});
  }

  getRoutesInRange(currentPage, sortBy, dummyFilter, dateRange) {
    return this.http.get<Route[]>(API_URL + '/route/betweenDates' +
      '?currPage=' + currentPage + '&sortBy=' + sortBy + '&filter=' + dummyFilter +
      '&startDate=' + dateRange.startDate.getTime() + '&endDate=' + dateRange.endDate.getTime(),  {headers});
  }

  filterByDirection(currentPage, sortBy, dummyFilter, dateRange, officeDirection, officeAddress) {
    if (sortBy == null) {
      sortBy = '';
    }
    if (dateRange.endDate == null) {
      dateRange.startDate = new Date(Date.now());
      dateRange.endDate = new Date();
      dateRange.endDate.setFullYear(2024);
    }
    if (officeDirection == null) {
      officeDirection = '';
    }
    let officeAddressId = '';
    if (officeAddress != null) {
      officeAddressId = officeAddress.id;
    }

    return this.http.get<Route[]>(API_URL + '/route/sortAndFilter' +
      '?currPage=' + currentPage + '&sortBy=' + sortBy + '&filter=' + dummyFilter +
      '&startDate=' + dateRange.startDate.getTime() + '&endDate=' + dateRange.endDate.getTime() +
      '&officeDirection=' + officeDirection + '&officeAddressId=' + officeAddressId,  {headers});
  }

  getPieChartDriversData() {
    return this.http.get<ChartDataModel[]>(API_URL + '/pieChartDriversData');
  }

  getTop15Users() {
    return this.http.get<TopUser[]>(API_URL + '/top15Users');
  }

  getTop15UsersByDrives() {
    return this.http.get<TopUser[]>(API_URL + '/top15UsersByDrives');
  }

  getTop15UsersByRating() {
    return this.http.get<TopUser[]>(API_URL + '/top15UsersByRating');
  }

  getCompanyAddresses() {
    return this.http.get<Address[]>(API_URL + '/companyAddresses');
  }

  uploadPicture(file: File) {
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<string>(API_URL + '/uploadPicture', data, {'headers' : {}});
  }

  searchByUsername(username) {
    return this.http.get<User[]>(API_URL + '/searchUser?username=' + username);
  }

  getAllRoutes() {
    return this.http.get<Route[]>(API_URL + '/allRoutes');
  }

  searchNotBlockedByUsername(username) {
    return this.http.get<User[]>(API_URL + '/searchNotBlockedUser?username=' + username);
  }

  blockUser(userId) {
    return this.http.patch<User>(API_URL + '/blockUser?userId=' + userId, {headers});
  }

  unblockUser(userId) {
    return this.http.patch<User>(API_URL + '/unblockUser?userId=' + userId, {headers});
  }
}
