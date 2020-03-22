import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Route} from '../data/route';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  getUser() {
    return this.apiService.get(Route.USER.GET_USER);
  }

  getUserInfo() {
    return this.apiService.get(Route.USER.USER_INFO);
  }
}
