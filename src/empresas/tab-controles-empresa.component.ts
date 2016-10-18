import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Control} from '../objetos/control';

@Component({
    selector: 'tab-controles-empresa',
    templateUrl: 'src/assets/templates/tab-controles-empresa.component.html',
    styleUrls: ['src/assets/css/tab-controles-empresa.component.css']
})

export class TabControlesEmpresaComponent implements OnInit {

    private subscription: Subscription;
    public controles: Control[] = [];
    public active: boolean = true;
    public guardar = [];
    public nuevoControl: Object = {};
    public idBorrar: number;
    public modal: boolean = false;


    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    ngOnInit() {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id; 
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
                                this.guardar[response.data[i].id] = false;
                            }
                        }
                });
        });
    }

    crearControl(nuevoControl: Control) {
        nuevoControl.idempresa = this.empresasService.seleccionada;
        this.servidor.postObject(URLS.CONTROLES, nuevoControl).subscribe(
            response => {
                if (response.success) {
                    nuevoControl.id = response.id;
                    this.controles.push(nuevoControl);
                    this.nuevoControl = {};
                }
        });
    }
    
    checkBorrar(idBorrar: number) {
        this.modal = true;
        this.idBorrar = idBorrar;
    }

    noBorrar() {
        this.modal = false;
    }

    borrarControl() {
        let parametros = '?id=' + this.idBorrar;
        this.servidor.deleteObject(URLS.CONTROLES, parametros).subscribe(
            response => {
                if (response.success) {
                    let controlBorrar = this.controles.find(control => control.id == this.idBorrar);
                    let indice = this.controles.indexOf(controlBorrar)
                    this.controles.splice(indice, 1);
                    this.modal = false;
                }
        });
    }

    modificarControl(idControl: number) {
        this.guardar[idControl] = true;
    }

    actualizarControl(idControl: number) {
        this.guardar[idControl] = false;
        let parametros = '?id=' + idControl;        
        let modControl = this.controles.find(control => control.id == idControl);
        this.servidor.putObject(URLS.CONTROLES, parametros, modControl).subscribe(
            response => {
                if (response.success) {
                    console.log('Control modificado');
                }
        });
    }

}
