import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from './user';

@Injectable()
export class LoginService {

    constructor (private http: Http) { }
    
    private postUrl = 'http://tfc.ntskoala.com/api/views/getusers.php?idempresa=1';

    logUser(loginUser: User) {
        // TODO: definir cómo se hará la llamada al servidor
        let params = 'user=' + loginUser.nombre + '&password=' + loginUser.password;
        let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');
        // devuelve un Observable
        return this.http.post(this.postUrl, params, {headers: headers})
            .map(res => res.json())

    }
    
}
