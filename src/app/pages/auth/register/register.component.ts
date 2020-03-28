import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {DANGER, INFO} from '../../../data/data';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm = {
    email: null,
    phone: null,
    name: null,
    password: null,
    password_confirmation: null,
    producerType: null,

  };
  public error = [];
  public messages = [];
  public status: string;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService
  ) {

  }

  onSubmit() {
    this.error = null;
    this.messages = [];
    this.spinner.show();
    this.authService.signUp(this.registerForm).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.spinner.hide();
    this.messages = [];
    this.messages.push(this.translateService.instant('User registration successful'));
    if (data.success) {
      this.status = INFO;
    } else {
      this.status = DANGER;
    }
  }

  handleError(error) {
    this.spinner.hide();
    this.messages = [];
    this.messages.push(error.error.message);
    this.status = DANGER;
  }

  ngOnInit() {
  }

}
