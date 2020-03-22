import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Route} from '../data/route';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    getAllUser() {
        return this.http.get(`${environment.API_BASE_PATH + Route.ADMIN.GET_ALL}/getAllUser`);
    }
}
