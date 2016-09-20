import {Injectable} from '@angular/core'; 
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../user';

@Injectable()
export class LoginService {

    constructor (private http: Http) {}
    
    private getUrl = 'http://tfc.ntskoala.com/api/actions/login.php';
    private postUrl = 'http://tfc.ntskoala.com/api/actions/login.php';

    getUsers() {
        return this.http.get(this.getUrl).map(res => res.json());
    }

    logUser(loginUser) {
        let answer = {};

        let user = JSON.stringify(loginUser);
        //let params = 'json=' + user;
        let params = 'user=' + loginUser.username + '&password=' + loginUser.password;
        let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');

        return this.http.post(this.postUrl, params, {headers: headers})
            .map(res => res.json())

    }
    
}
