import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';


import * as fromRoot from '../../../store/reducers';
import * as authActions from '../../../store/actions/auth.actions';
import {Observable} from 'rxjs';
import {DANGER, ERROR, INFO, SUCCESS} from '../../../data/data';
import {AuthService} from '../../../services/auth.service';
import {StorageService} from '../../../services/storage.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = {
    email: null,
    password: null,
  };

  getState: Observable<any>;
  error = null;
  confirm: any = {};
  currentURL: any;
  public messages = [];
  public status: string;
  public formPost = true;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private translateService: TranslateService
  ) {

    this.getState = this.store.select(fromRoot.selectAuthListState$);

  }

  ngOnInit() {


    this.hasConfirmRoute();

    this.getState.subscribe((state) => {

      if (state.errorMessage) {
        // this.handleError();
      }
      this.error = state.errorMessage;
    });
  }

  onSubmit() {

    this.error = null;
    this.messages = [];
    this.store.dispatch(new authActions.Login(this.form));

    this.store.subscribe(data => {
      if (data.auth.user !== null && data.auth.user.data.confirmation_token) {
        this.formPost = false;
      }
    });
  }


  hasConfirmRoute() {

    this.confirm.email = this.route.snapshot.paramMap.get('email');

    this.confirm.token = this.route.snapshot.paramMap.get('confirm_token');

    if (this.confirm.email && this.confirm.token) {

      this.authService.registerConfirmation(this.confirm).subscribe(data => {
        this.handleResponse(data);
      }, error => {
        this.handleError(error);
      });
    }


  }


  handleResponse(data) {
    this.messages = [];
    this.messages.push(this.translateService.instant('success_login'));
    if (data.status === SUCCESS) {
      this.status = INFO;
    } else if (data.status === ERROR) {
      this.status = DANGER;
    }
  }


  handleError(error) {
    this.messages = [];
    this.messages.push(this.translateService.instant('User email or password is wrong'));
    this.status = DANGER;
  }

}

