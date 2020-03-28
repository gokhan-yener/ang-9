import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Route} from '../../shared/util/route';
import {HttpParams} from '@angular/common/http';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {Subject} from 'rxjs';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
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
  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
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

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
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

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  setProduct(data: any) {
    return this.apiService.post(Route.PRODUCT.PRODUCT_ADD, data);
  }

  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  updateProduct(data: any) {
    return this.apiService.post(Route.PRODUCT.PRODUCT_UPDATE, data);
  }
}
