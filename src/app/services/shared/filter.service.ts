import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private apiService: ApiService, private router: Router) {
  }

  filter(query1, query2): Observable<any> {

    let httpParams = new HttpParams();
    Object.keys(query1).forEach((key) => {
      httpParams = httpParams.append(key, query1[key]);
    });
    Object.keys(query2).forEach((key) => {
      httpParams = httpParams.append(key, query2[key]);
    });

    return this.apiService.get(Route.FILTER.ACTION_SEARCH, httpParams).pipe(map(
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
