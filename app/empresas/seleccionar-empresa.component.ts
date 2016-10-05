import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
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
    subscription: Subscription;
    
    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        // Subscripción a la creación de nuevas empresa
        this.subscription = this.empresasService.nuevaEmpresa.subscribe(
            empresa => {
                this.empresas.push(empresa);
            }
        )
        
        let token = sessionStorage.getItem('token');
        let parametros = '?token=' + token; 
        // Conseguir la lista de empresas
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
        this.empresasService.seleccionar(this.empresas.find(empresa => empresa.id == seleccion));
    }

}
