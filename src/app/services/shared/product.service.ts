import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_PATH = '/product';
  private PRODUCT_GET_BY_ID_DETAILS = this.PRODUCT_PATH + '/detail/';
  private PRODUCT_GET_STATUSES = this.PRODUCT_PATH + '/statuses';

  constructor(private apiService: ApiService) {
  }

  getAll(page): Observable<any> {
    return this.apiService.get(this.PRODUCT_PATH + '/pagination', page).pipe(map(
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

  getById(id): Observable<any> {
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
  }
}
