import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {DANGER, INFO} from '../../../../data/data';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };
  public messages = [];
  public status: string;

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.messages = [];
    this.authService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }


  handleResponse(data) {
    this.messages = [];
    this.messages.push(data.message);
    if (data.success) {
      this.form.email = null;
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

}
