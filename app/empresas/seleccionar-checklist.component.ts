import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor.service'
import {URLS} from '../config';
import {Checklist} from './checklist';

@Component({
    selector: 'seleccionar-checklist',
    templateUrl: 'public/assets/templates/seleccionar-checklist.component.html',
    styleUrls: ['public/assets/css/seleccionar-checklist.component.css']
})
export class SeleccionarChecklistComponent {

    private subscription1: Subscription;
    private subscription2: Subscription;
    public seleccionada: number = 0;
    public checklist: number = 0;
    public checklists: Checklist[] = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {

        this.subscription1 = empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                this.seleccionada = seleccionada.id;
                let token = sessionStorage.getItem('token');
                let parametros = '?idempresa=' + seleccionada.id + '&token=' + token;
                // llamada al servidor para conseguir las checklists
                this.servidor.llamadaServidor('GET', URLS.CHECKLISTS, parametros).subscribe(
                    data => {
                        // vaciamos la lista actual
                        this.checklists = [];
                        let response = JSON.parse(data.json());
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
        this.subscription2 = empresasService.nuevaChecklist.subscribe(
            checklist => this.checklists.push(checklist)
        );

    }

    seleccionaChecklist(seleccion: number){
        this.empresasService.seleccionarChecklist(this.checklists.find(checklist => checklist.id == seleccion));
        this.checklist = seleccion;
    }

    borrarChecklist() {
        let parametros = '?id=' +  this.checklist;
        this.servidor.llamadaServidor('DELETE', URLS.CHECKLISTS, parametros).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    let checklistBorrar = this.checklists.find(checklist => checklist.id == this.checklist);
                    let indice = this.checklists.indexOf(checklistBorrar);
                    this.checklists.splice(indice, 1);
                    console.log('Checklist eliminada')
                }
        });
    }


}
