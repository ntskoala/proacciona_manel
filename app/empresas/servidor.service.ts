import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {Empresa} from '../objetos/empresa';

@Injectable()
export class Servidor {

    public resultado: any;

    constructor (private llamada: Http) {}
    
    llamadaServidor(metodo: string, serverUrl: string, parametros: string, object?: Object) {
        let payload = JSON.stringify(object);
        // llamada en función del método
        switch(metodo) {
            case 'POST':
                this.resultado = this.llamada.post(serverUrl + parametros, payload);
                break;
            case 'GET':
                this.resultado = this.llamada.get(serverUrl + parametros);
                break;
            case 'PUT':
                this.resultado =  this.llamada.put(serverUrl + parametros, payload);
                break;
            case 'DELETE':
                this.resultado = this.llamada.delete(serverUrl + parametros);
                break;
            default:
                console.log('Método erróneo');
                return;
        }
        return this.resultado.map((res: Response) => JSON.parse(res.json()));
    }

    getObjects(url: string, param: string) {
        let parametros = '?token=' + sessionStorage.getItem('token') + param; 
        return this.llamada.get(url + parametros).map((res: Response) => JSON.parse(res.json()));
    }

    postObject(url: string, object: Object) {
        let payload = JSON.stringify(object);        
        let parametros = '?token=' + sessionStorage.getItem('token');
        return this.llamada.post(url + parametros, payload).map((res: Response) => JSON.parse(res.json()));
    }

    putObject(url: string, param: string, object: Object) {
        let payload = JSON.stringify(object);        
        let parametros = param + '&token=' + sessionStorage.getItem('token');
        return this.llamada.put(url + parametros, payload).map((res: Response) => JSON.parse(res.json()));
    }
    
    deleteObject(url: string, param: string) {
        let parametros = param + '&token=' + sessionStorage.getItem('token');
        return this.llamada.delete(url + parametros).map((res: Response) => JSON.parse(res.json()));
    }
}
