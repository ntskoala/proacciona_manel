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
    public usuarioSeleccionado: number = 0;

    public checkControl: number | boolean[] = [];
    public checkChecklist: number | boolean[] = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionarPermisos()
        );
    }

    seleccionarPermisos() {
        this.usuarioSeleccionado = 0;
        let parametros = '&idempresa=' + this.empresasService.seleccionada;
        // conseguir usuarios
        this.servidor.getObjects(URLS.USUARIOS, parametros).subscribe(
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
        this.servidor.getObjects(URLS.CONTROLES, parametros).subscribe(
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
        this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
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
        this.checkControl = [];
        this.checkChecklist = [];
        let parametros = '&idusuario=' + idUsuario;
        // conseguir permissionusercontrol
        this.servidor.getObjects(URLS.PERMISSION_USER_CONTROL, parametros).subscribe(
            response => {
                this.permissionusercontrols = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.checkControl[response.data[i].idcontrol] = parseInt(response.data[i].id);
                    }
                }
        });
        // conseguir permissionuserchecklist
        this.servidor.getObjects(URLS.PERMISSION_USER_CHECKLIST, parametros).subscribe(
            response => {
                this.permissionuserchecklists = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.checkChecklist[response.data[i].idchecklist] = parseInt(response.data[i].id);
                    }
                }
        });

    }

    changeControl(idControl: number) {
        let parametros = '?id=' + this.checkControl[idControl];
        if (this.checkControl[idControl]) {
            this.checkControl[idControl] = false;
            this.servidor.deleteObject(URLS.PERMISSION_USER_CONTROL, parametros).subscribe(
                response => {
                    if (response.success) {
                        console.log('Permiso eliminado')
                    }
            });
        }
        else {
            let nuevoPermiso = new PermissionUserControl(0, idControl, this.usuarioSeleccionado);
            this.servidor.postObject(URLS.PERMISSION_USER_CONTROL, nuevoPermiso).subscribe(
                response => {
                    if (response.success) {
                        this.checkControl[idControl] = response.id;
                        console.log('Permiso añadido')
                    }
            });
        }
    }

    changeChecklist(idChecklist: number) {
        let parametros = '?id=' + this.checkChecklist[idChecklist];
        if (this.checkChecklist[idChecklist]) {
            this.checkChecklist[idChecklist] = false;
            this.servidor.deleteObject(URLS.PERMISSION_USER_CHECKLIST, parametros).subscribe(
                response => {
                    if (response.success) {
                        console.log('Permiso eliminado')
                    }
            });
        }
        else {
            let nuevoPermiso = new PermissionUserChecklist(0, idChecklist, this.usuarioSeleccionado);
            this.servidor.postObject(URLS.PERMISSION_USER_CHECKLIST, nuevoPermiso).subscribe(
                response => {
                    if (response.success) {
                        this.checkChecklist[idChecklist] = response.id;
                        console.log('Permiso añadido')
                    }
            });
        }
    }

}
