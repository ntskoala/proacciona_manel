import {Component} from '@angular/core';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Empresa} from './empresa';

@Component({
    selector: 'nueva-empresa',
    templateUrl: 'public/assets/templates/nueva-empresa.component.html',
    styleUrls: ['public/assets/css/nueva-empresa.component.css'],
    providers: [Servidor]
})

export class NuevaEmpresaComponent {

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}
    
    public active = true;
    private response: any;
    
    nuevaEmpresa(nombre: string, nif: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let token = sessionStorage.getItem('token');
        let nuevaEmpresa = new Empresa(nombre, nif, 0);
        let parametros = JSON.stringify(nuevaEmpresa);

        this.servidor.llamadaServidor('POST', URLS.EMPRESAS, parametros).subscribe(
            (data) => {
                this.response = JSON.parse(data);
                // si tiene éxito
                if (this.response.success) {
                    this.empresasService.crear(nuevaEmpresa);
                    console.log('Empresa creada')
                }
                // usuario erróneo
                else {
                    alert('Empresa no creada');
                }
            })
    }

}
