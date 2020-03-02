import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(environment.API_BASE_PATH + path, {params}).pipe(catchError(this.formatError));
  }

  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(environment.API_BASE_PATH + path, JSON.stringify(params), this.httpOptions).pipe(catchError(this.formatError));
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(environment.API_BASE_PATH + path, JSON.stringify(params), this.httpOptions).pipe(catchError(this.formatError));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(environment.API_BASE_PATH + path, {params}).pipe(catchError(this.formatError));
  }

  formatError(error: any) {
    return of(environment.API_BASE_PATH + error.error);
  }


}
