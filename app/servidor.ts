import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Servidor {

    constructor (private llamada: Http) { }
    
    llamadaServidor(metodo: string, serverUrl: string, parametros?: string) {

        let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');

        if (metodo == 'POST') {
            return this.llamada.post(serverUrl, parametros, {headers: headers}).map(res => res.json());
        } else if (metodo == 'GET') {
            return this.llamada.get(serverUrl);
        } else {
            console.log('Método erróneo');
            return;
        }

    }
    
}
