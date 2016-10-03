import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Empresa} from './empresa'
import {Usuario} from '../login/usuario';

@Component({
    selector: 'tab-controles-empresa',
    templateUrl: 'public/assets/templates/tab-controles-empresa.component.html',
    styleUrls: ['public/assets/css/tab-controles-empresa.component.css'],
    providers: [Servidor]
})

export class TabControlesEmpresaComponent {

    public usuarios: Usuario[] = [];
    private subscription: Subscription;

    constructor(
        private servidor: Servidor,
        private empresasService: EmpresasService) {

            this.subscription = empresasService.empresaSeleccionada.subscribe(
                seleccionada => {
                    let token = sessionStorage.getItem('token');
                    let parametros = '?idempresa=' + seleccionada.id + '&token=' + token; 
                    this.servidor.llamadaServidor('GET', URLS.USUARIOS, parametros).subscribe(
                        data => {
                            this.usuarios = [];
                            let response = JSON.parse(data.json());
                            if (response.success && response.data) {
                                for (let i = 0; i < response.data.length; i++) {
                                    this.usuarios.push(new Usuario(
                                        response.data[i].idusuario,
                                        response.data[i].usuario,
                                        response.data[i].password,
                                        response.data[i].tipouser,
                                        response.data[i].nombre,
                                        response.data[i].idempresa
                                    ))
                                }
                            }
                        });
                });
    }

}
