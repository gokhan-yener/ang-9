import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {DANGER, INFO} from '../../../data/data';
import {TranslateService} from '@ngx-translate/core';

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
    private translateService: TranslateService
  ) {

  }

  onSubmit() {
    this.error = null;
    this.messages = [];
    console.log(this.registerForm);
    this.authService.signUp(this.registerForm).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.messages = [];
    this.messages.push(this.translateService.instant('User registration successful'));
    if (data.success) {
      this.status = INFO;
    } else {
      this.status = DANGER;
    }
  }

  handleError(error) {
    this.messages = [];
    this.messages.push(error.error.message);
    this.status = DANGER;
  }

  ngOnInit() {
  }

}
