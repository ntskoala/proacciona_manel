import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Checklist} from '../objetos/checklist';
import {ControlChecklist} from '../objetos/controlchecklist';

@Component({
    selector: 'tab-checklists-empresa',
    templateUrl: 'public/assets/templates/tab-checklists-empresa.component.html',
    styleUrls: ['public/assets/css/tab-checklists-empresa.component.css']
})
export class TabChecklistsEmpresaComponent {

    private subscription: Subscription;
    public checklistNumber: number = 0;
    public checklist: Checklist = new Checklist(0, 0, 'Seleccionar checklist');
    public checklists: Checklist[] = [];
    public controlchecklists: ControlChecklist[] = [];
    public guardar = [];
    public active: boolean = true;
    
    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let token = sessionStorage.getItem('token');
                let parametros = '?idempresa=' + seleccionada.id + '&token=' + token;
                // llamada al servidor para conseguir las checklists
                this.servidor.llamadaServidor('GET', URLS.CHECKLISTS, parametros).subscribe(
                    response => {
                        // ocultamos mostrar control checklists
                        this.checklistNumber = 0;
                        // vaciamos la lista actual
                        this.checklists = [];
                        this.checklists.push(this.checklist);
                        if (response.success && response.data) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.checklists.push(new Checklist(
                                    response.data[i].id,
                                    response.data[i].idempresa,
                                    response.data[i].nombrechecklist
                                ))
                            }
                        }
                });
        });
    }

    borrarChecklist() {
        let token = sessionStorage.getItem('token');
        let parametros = '?id=' +  this.checklistNumber + '&token=' + token;
        this.servidor.llamadaServidor('DELETE', URLS.CHECKLISTS, parametros).subscribe(
            response => {
                if (response.success) {
                    let checklistBorrar = this.checklists.find(checklist => checklist.id == this.checklistNumber);
                    let indice = this.checklists.indexOf(checklistBorrar);
                    this.checklists.splice(indice, 1);
                    console.log('Checklist eliminada')
                }
        });
    }

    nuevaChecklist(nombre: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);
        
        let nuevaChecklist = new Checklist(0, this.empresasService.seleccionada, nombre);
        let token = sessionStorage.getItem('token');
        let parametros = '?token=' + token;
        this.servidor.llamadaServidor('POST', URLS.CHECKLISTS, parametros, nuevaChecklist).subscribe(
            response => {
                // si tiene éxito
                if (response.success) {
                    nuevaChecklist.id = response.id;
                    this.checklists.push(nuevaChecklist);
                    console.log('Checklist creada');
                }
                // checklist errónea
                else {
                    alert('Checklist no creada');
                }
        });
    }
    
    mostrarControlchecklist(seleccion: number) {
        let token = sessionStorage.getItem('token');
        let parametros = '?idchecklist=' + seleccion + '&token=' + token;
        // llamada al servidor para conseguir los controlchecklist
        this.servidor.llamadaServidor('GET', URLS.CONTROLCHECKLISTS, parametros).subscribe(
            response => {
                this.controlchecklists = [];
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
            // mostramos la lista de control checklists
            this.checklistNumber = seleccion;        
        });
    }

    crearControlchecklist(nombre: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let nuevoControlchecklist = new ControlChecklist(0, this.checklistNumber, nombre);
        let token = sessionStorage.getItem('token');
        let parametros = '?token=' + token;

        this.servidor.llamadaServidor('POST', URLS.CONTROLCHECKLISTS, parametros, nuevoControlchecklist).subscribe(
            response => {
                if (response.success) {
                    nuevoControlchecklist.id = response.id;
                    this.controlchecklists.push(nuevoControlchecklist);
                }
        });
    }

    borrarControlchecklist(idControlchecklist: number) {
        let token = sessionStorage.getItem('token');
        let parametros = '?id=' + idControlchecklist + '&token=' + token;
        this.servidor.llamadaServidor('DELETE', URLS.CONTROLCHECKLISTS, parametros).subscribe(
            response => {
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
        let modControlchecklist = this.controlchecklists.find(controlchecklist => controlchecklist.id == idControlchecklist);
        let token = sessionStorage.getItem('token');
        let parametros = '?id=' +  idControlchecklist.toString() + '&token=' + token;
        this.servidor.llamadaServidor('PUT', URLS.CONTROLCHECKLISTS, parametros, modControlchecklist).subscribe(
            response => {
                if (response.success) {
                    console.log('Controlchecklist modificado');
                }
        });
    }

}
