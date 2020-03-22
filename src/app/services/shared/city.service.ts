import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {Cacheable} from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiService: ApiService) {
  }

  @Cacheable()
  getAll(): Observable<any> {
    return this.apiService.get(Route.CITY.CITIES).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

}
