import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Servidor {

    constructor (private llamada: Http) { }
    
    llamadaServidor(metodo: string, serverUrl: string, parametros?: string) {

        let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');

        switch(metodo) {
            case 'POST':
                return this.llamada.post(serverUrl, parametros, {headers: headers}).map(res => res.json());
            case 'GET':
                return this.llamada.get(serverUrl + parametros);
            case 'DELETE':
                return this.llamada.delete(serverUrl + parametros);
            default:
                console.log('Método erróneo');
                return;
        }

        

    }
    
}
