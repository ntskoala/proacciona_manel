import {Injectable} from '@angular/core'; 
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Servidor {

    constructor (private llamada: Http) {}
    
    llamadaServidor(metodo: string, serverUrl: string, parametros: string, object?: Object) {
        let headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');
        // llamada en función del método
        switch(metodo) {
            case 'POST':
                return this.llamada.post(serverUrl, parametros, {headers: headers});
            case 'GET':
                return this.llamada.get(serverUrl + parametros);
            case 'PUT':
                let payload = JSON.stringify(object);
                return this.llamada.put(serverUrl + parametros, payload);
            case 'DELETE':
                return this.llamada.delete(serverUrl + parametros);
            default:
                console.log('Método erróneo');
                return;
        }
    }
    
}
