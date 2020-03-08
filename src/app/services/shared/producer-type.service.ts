import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';

@Injectable({
  providedIn: 'root'
})
export class ProducerTypeService {

  constructor(private apiService: ApiService) {
  }

  getAll(): Observable<any> {
    return this.apiService.get(Route.PRODUCER_TYPE.PRODUCER + Route.PRODUCER_TYPE.GET_ALL).pipe(map(
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
