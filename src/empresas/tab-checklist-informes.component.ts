import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {ResultadoChecklist} from '../objetos/resultadochecklist';

@Component({
    selector: 'tab-checklist-informes',
    templateUrl: 'src/assets/templates/tab-checklist-informes.component.html',
    styleUrls: ['src/assets/css/tab-checklist-informes.component.css']
})
export class TabChecklistInformesComponent implements OnInit{
    
    private subscription: Subscription;
    public controles: any[] = [];
    public resultadoschecklist: ResultadoChecklist[] = [];
    public columnas: string[] = [];
    public resultado: Object;
    public tabla: Object[] = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    ngOnInit() {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id; 
                this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
                    response => {
                        this.controles = [];
                        this.columnas = [];
                        if (response.success && response.data) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.controles.push({
                                    id: response.data[i].id,
                                    nombre: response.data[i].nombre,
                                });
                                this.columnas.push(response.data[i].nombre);
                            }
                        }
                });
        });
    }

}
