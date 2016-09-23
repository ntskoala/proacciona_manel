import {Component} from '@angular/core';

import {Servidor} from '../servidor';
import {URLS} from '../config';

@Component({
    selector: 'nueva-empresa',
    templateUrl: 'public/assets/templates/nueva-empresa.component.html',
    styleUrls: ['public/assets/css/nueva-empresa.component.css'],
    providers: [Servidor]
})

export class NuevaEmpresaComponent {

    constructor(private servidor: Servidor) {}
    
    public active = true;
    private response: any;
    
    nuevaEmpresa(nombre: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let token = sessionStorage.getItem('token');
        let parametros = 'nombre=' + nombre + '&token=' + token; 

        this.servidor.llamadaServidor('POST', URLS.NUEVA_EMPRESA, parametros).subscribe(
            (data) => {
                this.response = JSON.parse(data);
                // si tiene éxito
                if (this.response.success) {
                    alert('Empresa creada');
                }
                // usuario erróneo
                else { // NO FUNCIONA
                    alert('Empresa no creada');
                }
            })
    }

}
