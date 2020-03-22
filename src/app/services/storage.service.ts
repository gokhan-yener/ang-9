import {Injectable} from '@angular/core';
import {USER, ADMIN} from '../data/data';
import {Router} from '@angular/router';
import {Route} from '../data/route';

@Injectable()
export class StorageService {

  constructor(private router: Router) {
  }


  setUser(user) {
    localStorage.setItem('user', user);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  setRole(role) {
    localStorage.setItem('role', role);
  }

  getRole() {
    if (this.payload(this.getToken())) {
      const role = this.payload(this.getToken());
      return role.scopes[0];
    }
    // return localStorage.getItem('role');
  }

  removeRole() {
    localStorage.removeItem('role');
  }


  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return true;
      }
    }
    return false;
  }


  payload(token) {
    if (token) {
      const payload = token.split('.')[1];
      return this.decode(payload);
    } else {
      return false;
    }

  }

  decode(payload) {
    if (payload) {
      return JSON.parse(atob(payload));
    }
  }

  loggedIn() {
    return this.isValid();
  }

  handleAllRole(role) {
    if (role === USER) {
      this.router.navigateByUrl(Route.USER.PROFILE);
    } else if (role === ADMIN) {
      this.router.navigateByUrl(Route.ADMIN.PROFILE);
    }
  }
}
