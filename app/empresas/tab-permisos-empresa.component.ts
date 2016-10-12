import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Usuario} from '../objetos/usuario';
import {Control} from '../objetos/control';
import {Checklist} from '../objetos/checklist';
import {PermissionUserControl} from '../objetos/permissionusercontrol';
import {PermissionUserChecklist} from '../objetos/permissionuserchecklist';

@Component({
    selector: 'tab-permisos-empresa',
    templateUrl: 'public/assets/templates/tab-permisos-empresa.component.html',
    styleUrls: ['public/assets/css/tab-permisos-empresa.component.css']
})
export class TabPermisosEmpresaComponent {

    private subscription: Subscription;
    public usuario: Usuario = new Usuario(0, 'Seleccionar usuario', '', '', '', 0)
    public usuarios: Usuario[] = [];
    public controles: Control[] = [];
    public checklists: Checklist[] = [];
    public permissionusercontrols: PermissionUserControl[] = [];
    public permissionuserchecklists: PermissionUserChecklist[] = [];
    public empresaSeleccionada: number = 0;
    public usuarioSeleccionado: number = 0;

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                this.usuarioSeleccionado = 0;
                this.empresaSeleccionada = seleccionada.id;
                this.seleccionarPermisos();
        });
    }

    seleccionarPermisos() {
        this.empresaSeleccionada = this.empresasService.seleccionada;
        let token = sessionStorage.getItem('token');
        let parametros = '?idempresa=' + this.empresaSeleccionada + '&token=' + token;
        // conseguir usuarios
        this.servidor.llamadaServidor('GET', URLS.USUARIOS, parametros).subscribe(
            response => {
                this.usuarios = [];
                this.usuarios.push(this.usuario);
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

    seleccionarUsuario(idUsuario: number) {
        this.usuarioSeleccionado = idUsuario;
        let token = sessionStorage.getItem('token');
        let parametros = '?idusuario=' + idUsuario + '&token=' + token;
        // conseguir permissionusercontrol
        this.servidor.llamadaServidor('GET', URLS.PERMISSION_USER_CONTROL, parametros).subscribe(
            response => {
                this.permissionusercontrols = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.permissionusercontrols.push(new PermissionUserControl(
                            response.data[i].id,
                            response.data[i].idcontrol,
                            response.data[i].idusuario
                        ));
                    }
                }
        });
        // conseguir permissionuserchecklist
        this.servidor.llamadaServidor('GET', URLS.PERMISSION_USER_CHECKLIST, parametros).subscribe(
            response => {
                this.permissionuserchecklists = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.permissionuserchecklists.push(new PermissionUserChecklist(
                            response.data[i].id,
                            response.data[i].idchecklist,
                            response.data[i].idusuario
                        ));
                    }
                }
        });

    }

}
