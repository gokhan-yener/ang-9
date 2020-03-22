import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {FruitAndVegetable} from '../../model/fruit_vegetable';
import {Cacheable} from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class FruitVegetableService {

  constructor(private apiService: ApiService) {
  }

  @Cacheable()
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

  /*  getById(id): Observable<any> {
      return this.apiService.get(this.PRODUCT_PATH, id).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }

    createproduct(product): Observable<any> {
      return this.apiService.post(this.PRODUCT_PATH, product).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }

    updateproduct(product): Observable<any> {
      return this.apiService.put(this.PRODUCT_PATH + '/' + product.id, product).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }

    delete(id): Observable<any> {
      return this.apiService.delete(this.PRODUCT_PATH, id).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }

    getAllproductStatuses() {
      return this.apiService.get(this.PRODUCT_GET_STATUSES).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }

    getByIdWithDetails(id: number) {
      return this.apiService.get(this.PRODUCT_GET_BY_ID_DETAILS + id).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            console.log(res);
            return {};
          }
        }
      ));
    }*/
}
