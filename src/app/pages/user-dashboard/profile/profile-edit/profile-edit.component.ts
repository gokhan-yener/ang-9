import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfo} from '../../../../model/user';
import {UserService} from '../../../../services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {DANGER, ERROR, INFO, SUCCESS} from '../../../../data/data';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: UserInfo;

  profileForm: FormGroup;
  submitted = false;
  public messages = [];
  public status: string;

  constructor(private userService: UserService, private translateService: TranslateService) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl(null),
      confirm: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe((data: UserInfo) => {
      this.user = data;
      this.profileForm.get('name').setValue(data.name);
      this.profileForm.get('email').setValue(data.email);
      this.profileForm.get('mobile').setValue(data.mobile);
    });
  }

  checkPasswords(pass: string, confirmPass: string): boolean {

    if (this.profileForm.get('password').value !== null) {
      if (pass === confirmPass && pass?.length > 5) {
        return true;
      } else if (pass !== confirmPass) {
        this.status = DANGER;
        this.messages.push(this.translateService.instant('Password field and confirm password not equal.'));
      } else {
        this.status = DANGER;
        this.messages.push(this.translateService.instant('Password could be min 6 character'));
      }
    } else {
      return true;
    }

  }

  onSubmit() {
    this.messages = [];
    this.status = null;

    const pass = this.profileForm.get('password').value;
    const confirmPass = this.profileForm.get('confirm').value;

    if (this.checkPasswords(pass, confirmPass)) {
      this.userService.setUserInfo(this.profileForm.value).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error));
    }
  }

  handleResponse(data) {
    this.messages = [];
    this.messages.push(this.translateService.instant('update_user_info'));
    if (data) {
      this.profileForm.get('password').setValue(null);
      this.profileForm.get('confirm').setValue(null);
      this.status = INFO;
    } else if (data.status === ERROR) {
      this.status = DANGER;
    }
  }


  handleError(error) {
    this.messages = [];
    this.messages.push(this.translateService.instant('Please check user information'));
    this.status = DANGER;
  }

}
