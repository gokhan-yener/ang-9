import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private store: Store<any>) {
  }

  signUp(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/signUp`, data);
  }

  login(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/login`, data);
  }

  logout(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/logout`, data);
  }

/*  otp(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/otp`, data);
  }*/

  sendPasswordResetLink(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${environment.API_BASE_PATH}/auth/resetPassword`, data);
  }

  getAllStates() {
    return this.store.select(state => state.appReducer);
  }

  registerConfirmation(data): Observable<any> {
    return this.http.post(`${environment.API_BASE_PATH}/auth/checkConfirmToken`, data)
      .pipe(catchError(this.formatError));
  }

  formatError(error: any) {
    return of(error.error);
  }


}
