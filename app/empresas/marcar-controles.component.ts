import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Control} from '../objetos/control';

@Component({
    selector: 'marcar-controles',
    templateUrl: 'public/assets/templates/marcar-controles.component.html',
    styleUrls: ['public/assets/css/marcar-controles.component.css']
})
export class MarcarControlesComponent {

    private subscription: Subscription;
    public controles: Control[] = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {

        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let token = sessionStorage.getItem('token');
                let parametros = '?idempresa=' + seleccionada.id + '&token=' + token;
                this.servidor.llamadaServidor('GET', URLS.CONTROLES, parametros).subscribe(
                    data => {
                        this.controles = [];
                        let response = JSON.parse(data.json());
                        if (response.success && response.data) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.controles.push(new Control(
                                    response.data[i].id,
                                    response.data[i].nombre,
                                    response.data[i].pla,
                                    response.data[i].valorminimo,
                                    response.data[i].valormaximo,
                                    response.data[i].objetivo,
                                    response.data[i].tolerancia,
                                    response.data[i].critico,
                                    response.data[i].periodicidad,
                                    response.data[i].tipoperiodo,
                                    response.data[i].idempresa
                                ));
                            }
                        }
                });
        });
    }

}
