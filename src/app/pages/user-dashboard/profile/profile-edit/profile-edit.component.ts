import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfo} from '../../../../model/user';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: UserInfo;

  profileForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService) {
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
      this.profileForm.get('name').setValue( data.name);
      this.profileForm.get('email').setValue(data.email);
      this.profileForm.get('mobile').setValue( data.mobile);
    });
  }

  checkPasswords(pass: string, confirmPass: string): boolean {
    return pass === confirmPass;
  }

  onSubmit() {

    const pass = this.profileForm.get('password').value;
    const confirmPass = this.profileForm.get('confirm').value;
    if (this.checkPasswords(pass, confirmPass)) {

    }


  }


}
