import {Injectable} from '@angular/core'; 
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Servidor {

    public resultado: any;

    constructor (private llamada: Http) {}
    
    llamadaServidor(metodo: string, serverUrl: string, parametros: string, object?: Object) {
        let payload = JSON.stringify(object);
        // llamada en función del método
        switch(metodo) {
            case 'POST':
                this.resultado = this.llamada.post(serverUrl + parametros, payload)
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
        return this.resultado.map((res: Response) => JSON.parse(res.json()));;
    }
    
}
