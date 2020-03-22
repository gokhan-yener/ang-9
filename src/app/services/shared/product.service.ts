import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {HttpParams} from '@angular/common/http';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {
  }

  getAll(page = null): Observable<any> {
    return this.apiService.get(Route.PRODUCT.PRODUCTS + Route.PRODUCT.GET_ALL, page).pipe(map(
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

  getAllUserProducts(): Observable<any> {
    return this.apiService.get(Route.PRODUCT.GET_USER_PRODUCTS).pipe(map(
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

  // this is all harvest product
  getAllProduct(params, pageNumber): Observable<any> {

    return this.apiService.get(Route.PRODUCT.GET_ALL_PRODUCTS + '?page=' + pageNumber, params).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getProductDetailByIdAndSlug(id: string, slug: string) {

    const params = new HttpParams()
      .set('producerAddressId', id)
      .set('productSlug', slug);

    return this.apiService.get(Route.PRODUCT.GET_DETAIL, params).pipe(map(
      res => {
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

*/
}
