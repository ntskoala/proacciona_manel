import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Usuario} from '../objetos/usuario';
import {Control} from '../objetos/control';
import {Checklist} from '../objetos/checklist';

@Component({
    selector: 'tab-permisos-empresa',
    templateUrl: 'public/assets/templates/tab-permisos-empresa.component.html',
    styleUrls: ['public/assets/css/tab-permisos-empresa.component.css']
})
export class TabPermisosEmpresaComponent {

    private subscription: Subscription;
    public usuarios: Usuario[] = [];
    public controles: Control[] = [];
    public checklists: Checklist[] = [];
    public seleccionada: number;

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionarUsuario()
        );
    }

    seleccionarUsuario() {
        this.seleccionada = this.empresasService.seleccionada;
        let token = sessionStorage.getItem('token');
        let parametros = '?idempresa=' + this.seleccionada + '&token=' + token;
        // conseguir usuarios
        this.servidor.llamadaServidor('GET', URLS.USUARIOS, parametros).subscribe(
            response => {
                this.usuarios = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.usuarios.push(new Usuario(
                            response.data[i].id,
                            response.data[i].usuario,
                            response.data[i].password,
                            response.data[i].tipouser,
                            response.data[i].nombre,
                            response.data[i].idempresa
                        ))
                    }
                }
        });
        // conseguir controles
        this.servidor.llamadaServidor('GET', URLS.CONTROLES, parametros).subscribe(
            response => {
                this.controles = [];
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
        // conseguir checklists
        this.servidor.llamadaServidor('GET', URLS.CHECKLISTS, parametros).subscribe(
            response => {
                this.checklists = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.checklists.push(new Checklist(
                            response.data[i].id,
                            response.data[i].idempresa,
                            response.data[i].nombrechecklist
                        ));
                    }
                }
        });
    }


}
