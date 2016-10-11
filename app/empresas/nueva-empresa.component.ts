import {Component} from '@angular/core';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Empresa} from '../objetos/empresa';

@Component({
    selector: 'nueva-empresa',
    templateUrl: 'public/assets/templates/nueva-empresa.component.html',
    styleUrls: ['public/assets/css/nueva-empresa.component.css']
})

export class NuevaEmpresaComponent {

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}
    
    public active: boolean = true;
    
    nuevaEmpresa(nombre: string, nif: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let nuevaEmpresa = new Empresa(nombre, nif, 0);
        let token = sessionStorage.getItem('token');
        let parametros = '?token=' + token;

        this.servidor.llamadaServidor('POST', URLS.EMPRESAS, parametros, nuevaEmpresa).subscribe(
            response => {
                // si tiene éxito
                if (response.success) {
                    this.empresasService.empresaCreada(nuevaEmpresa);
                    console.log('Empresa creada')
                }
                // usuario erróneo
                else {
                    alert('Empresa no creada');
                }
        });
    }

}
