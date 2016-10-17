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

    crearControl(nombre: string, pla: string, minimo:number, maximo: number, objetivo: number,
        tolerancia: number, critico: number, periodicidad: string, periodo: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let nuevoControl = new Control(0, nombre, pla, minimo, maximo, objetivo,
            tolerancia, critico, periodicidad, periodo, this.empresasService.seleccionada);
        this.servidor.postObject(URLS.CONTROLES, nuevoControl).subscribe(
            response => {
                if (response.success) {
                    nuevoControl.id = response.id;
                    this.controles.push(nuevoControl);
                }
        });
    }

    borrarControl(idControl: number) {
        let parametros = '?id=' + idControl;
        this.servidor.deleteObject(URLS.CONTROLES, parametros).subscribe(
            response => {
                if (response.success) {
                    let controlBorrar = this.controles.find(control => control.id == idControl);
                    let indice = this.controles.indexOf(controlBorrar)
                    this.controles.splice(indice, 1);
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
