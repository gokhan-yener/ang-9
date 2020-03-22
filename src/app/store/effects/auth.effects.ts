import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';

import {HttpClient} from '@angular/common/http';

import {Observable, of, Subscriber} from 'rxjs';
import {Action} from '@ngrx/store';

import * as authActions from '../actions/auth.actions';

import {mergeMap, switchMap, map, catchError, tap, take} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {AuthActionTypes, AuthActions} from '../actions/auth.actions';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';
import {User} from '../../model/user';
import {Route} from '../../data/route';


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private storageService: StorageService) {
  }


  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: AuthActions) => {
      return this.authService.login(action.payload).pipe(
        map((data: any) => {
          this.saveUserToken(data);
          return new authActions.LoginSuccess(data);
        }),
        catchError((error) => {
          return of(new authActions.LoginFailure({payload: error}));
        })
      );
    })
  );

/*  @Effect()
  otp$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.OTP),
    switchMap((action: AuthActions) => {
      return this.authService.otp(action.payload).pipe(
        map((data: any) => {
          this.saveUserToken(data);
          return new authActions.OtpSuccess(data);
        }),
        catchError((error) => {
          return of(new authActions.OtpFailure({payload: error}));
        })
      );
    })
  );*/

  @Effect({dispatch: false})
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.storageService.removeToken();
      this.storageService.removeRole();
      this.storageService.removeUser();
      this.router.navigateByUrl(Route.PUBLIC.LOGIN);
    })
  );

  saveUserToken(user: User) {
    this.storageService.setToken(user.data.access_token);
    this.storageService.setUser(user.data.email);
    this.storageService.handleAllRole(this.storageService.getRole());
  }


}
