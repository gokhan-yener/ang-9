import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route} from '../data/route';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PubService {
    private baseUrl = environment.API_BASE_PATH;

    constructor(private http: HttpClient) {
    }

    getPub() {
        return this.http.get(`${this.baseUrl + Route.PUBLIC.GET}`);
    }

}
