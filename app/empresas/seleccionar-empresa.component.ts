import {Component} from '@angular/core';

import {SeleccionarEmpresaService} from './seleccionar-empresa.service';
import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Empresa} from './empresa';

@Component({
    selector: 'seleccionar-empresa',
    templateUrl: 'public/assets/templates/seleccionar-empresa.component.html',
    styleUrls: ['public/assets/css/seleccionar-empresa.component.css'],
    providers: [Servidor],
})

export class SeleccionarEmpresaComponent {
    
    public empresas: Empresa[] = [];
    
    constructor(
        private servidor: Servidor,
        private seleccionarEmpresaService: SeleccionarEmpresaService) {
        
            let token = sessionStorage.getItem('token');
            let parametros = ''; //token=' + token; 

            this.servidor.llamadaServidor('GET', URLS.EMPRESAS, parametros).subscribe(
                data => {
                    let response = JSON.parse(data.json());
                    if (response.success) {
                        for (let i = 0; i < response.data.length; i++) {
                            this.empresas.push(new Empresa(
                                response.data[i].nombre,
                                response.data[i].cif,
                                response.data[i].id
                            ))
                        }
                    }
                })

    }

    seleccionaEmpresa(seleccion: number){
        this.seleccionarEmpresaService.seleccionar(this.empresas.find(empresa => empresa.id == seleccion));
    }

}
