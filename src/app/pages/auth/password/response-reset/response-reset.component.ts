import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {DANGER, INFO} from '../../../../data/data';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  public messages = [];
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params.token;
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    this.error = null;
    this.messages = [];

    this.authService.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }


  handleResponse(data) {
    this.messages = [];
    this.messages.push(data.message);
    if (data.success) {
      this.status = INFO;
      //   this.router.navigateByUrl(Route.PUBLIC.LOGIN);
    } else {
      this.status = DANGER;
    }
  }

  handleError(error) {
    this.messages = [];
    this.messages.push(error.error.message);
    this.status = DANGER;
  }

}
