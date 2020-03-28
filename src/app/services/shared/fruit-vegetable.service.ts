import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {FruitAndVegetable} from '../../model/fruit_vegetable';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {Subject} from 'rxjs';

const cacheBuster$ = new Subject<void>();
@Injectable({
  providedIn: 'root'
})
export class FruitVegetableService {

  constructor(private apiService: ApiService) {
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(): Observable<FruitAndVegetable[]> {
    return this.apiService.get(Route.FRUIT_VEGETABLE.FRUITANDVEGETABLES + Route.FRUIT_VEGETABLE.GET_ALL).pipe(map(
      (res: any) => {
        if (res) {
          return res.map((data: FruitAndVegetable) => {
            return {id: data.slug, text: data.name};
          });
        } else {
          return {};
        }
      }
    ));
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAllHarvestPeriod() {
    return this.apiService.get(Route.FRUIT_VEGETABLE.FRUITANDVEGETABLES + Route.FRUIT_VEGETABLE.HARVEST_PERIOD).pipe(map(
      (res: any) => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

}
