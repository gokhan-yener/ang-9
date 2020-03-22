import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';
import {AuthService} from '../../../services/auth.service';
import * as fromRoot from '../../../store/reducers';
import {State} from '../../../store/reducers';
import * as authActions from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public data: any[] = [];
  public options: any;
  loggedIn: boolean;
  role: any;
  state: State;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {


    this.store.select(state => state.auth).subscribe((state) => {
      this.loggedIn = this.storageService.loggedIn();
      this.role = this.storageService.getRole();
    });

    this.loadSelect2();

    this.options = { placeholder: 'en-us' };
    const tempOpt = JSON.parse(JSON.stringify(this.options));
    tempOpt.placeholder = 'Không tìm thấy';
    this.options = tempOpt;
  }

  private loadSelect2(): void {
    this.data = [
      { id: 1, text: 'Hue' },
      { id: 2, text: 'Da Nang' },
      { id: 3, text: 'Vung Tau' },
    ];
    this.data.unshift({ id: -1, text: 'Select All' });
  }

  logout(): void {
    this.store.dispatch(new authActions.Logout(''));
  }
}
