import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route} from '../data/route';
import {ApiService} from './api.service';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {Subject} from 'rxjs';


const cacheBuster$ = new Subject<void>();

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

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getUserInfo() {
    return this.apiService.get(Route.USER.USER_INFO);
  }

  getUserProducts() {
    return this.apiService.get(Route.USER.PRODUCTS);
  }


  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  setUserInfo(data: any) {
    return this.apiService.post(Route.USER.UPDATE_USER_INFO, data);
  }
}
