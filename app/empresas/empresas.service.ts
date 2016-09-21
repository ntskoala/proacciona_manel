import {Injectable} from '@angular/core'; 
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../user';

@Injectable()
export class EmpresasService {

    constructor (private http: Http) {}
    
    private getUrl = 'http://tfc.ntskoala.com/api/views/listadoempresas.php';
   

    getEmpresas() {
        return this.http.get(this.getUrl).map(res => res.json());
    }

    
}