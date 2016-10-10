import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {ControlChecklist} from '../objetos/controlchecklist';

@Component({
    selector: 'mostrar-checklist',
    templateUrl: 'public/assets/templates/mostrar-checklist.component.html',
    styleUrls: ['public/assets/css/mostrar-checklist.component.css']
})
export class MostrarChecklistComponent {

    private subscription: Subscription;
    public seleccionada: number = 0;
    public controlchecklists: ControlChecklist[] = [];
    public active: boolean = true;
    public guardar = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = this.empresasService.checklistSeleccionada.subscribe(
            seleccionada => {
                this.seleccionada = seleccionada.id;
                let token = sessionStorage.getItem('token');
                let parametros = '?idchecklist=' + seleccionada.id + '&token=' + token;
                // llamada al servidor para conseguir los controlchecklist
                this.servidor.llamadaServidor('GET', URLS.CONTROLCHECKLISTS, parametros).subscribe(
                    data => {
                        this.controlchecklists = [];
                        let response = JSON.parse(data.json());
                        if (response.success && response.data) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.controlchecklists.push(new ControlChecklist(
                                    response.data[i].id,
                                    response.data[i].idchecklist,
                                    response.data[i].nombre
                                ))
                                this.guardar[response.data[i].id] = false;
                            }
                        }
                });
        });
    }

    crearControlchecklist(nombre: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let nuevoControlchecklist = new ControlChecklist(0, this.seleccionada, nombre);
        let parametros = JSON.stringify(nuevoControlchecklist);

        this.servidor.llamadaServidor('POST', URLS.CONTROLCHECKLISTS, parametros).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    nuevoControlchecklist.id = response.id;
                    this.controlchecklists.push(nuevoControlchecklist);
                }
        });
    }

    borrarControlchecklist(idControlchecklist: number) {
        let parametros = '?id=' + idControlchecklist;
        this.servidor.llamadaServidor('DELETE', URLS.CONTROLCHECKLISTS, parametros).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    let controlchecklistBorrar = this.controlchecklists.find(controlchecklist => controlchecklist.id == idControlchecklist);
                    let indice = this.controlchecklists.indexOf(controlchecklistBorrar);
                    this.controlchecklists.splice(indice, 1);
                }
        });
    }

    modificarControlchecklist(idControlchecklist: number) {
        this.guardar[idControlchecklist] = true;
    }
    
    actualizarControlchecklist(idControlchecklist: number) {
        this.guardar[idControlchecklist] = false;
        let parametros = '?id=' +  idControlchecklist.toString();
        let modControlchecklist = this.controlchecklists.find(controlchecklist => controlchecklist.id == idControlchecklist);

        this.servidor.llamadaServidor('PUT', URLS.CONTROLCHECKLISTS, parametros, modControlchecklist).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    console.log('Controlchecklist modificado');
                }
        });
    }

}
