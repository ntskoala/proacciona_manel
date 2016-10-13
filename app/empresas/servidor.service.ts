import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {Empresa} from '../objetos/empresa';

@Injectable()
export class Servidor {

    constructor (private llamada: Http) {}
    
    login(url: string, param: string) {
        return this.llamada.post(url + param, '').map((res: Response) => JSON.parse(res.json()));
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
