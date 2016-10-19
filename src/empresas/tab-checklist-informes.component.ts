import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Checklist} from '../objetos/checklist';
import {ControlChecklist} from '../objetos/controlchecklist';
import {ResultadoChecklist} from '../objetos/resultadochecklist';

@Component({
    selector: 'tab-checklist-informes',
    templateUrl: 'src/assets/templates/tab-checklist-informes.component.html',
    styleUrls: ['src/assets/css/tab-checklist-informes.component.css']
})
export class TabChecklistInformesComponent implements OnInit{
    
    private subscription: Subscription;
    public checklistSeleccionada: number = 0;
    public checklist: Checklist = new Checklist(0, 0, 'Seleccionar checklist');
    public checklists: any[] = [];
    public controlchecklists: ControlChecklist[] = [];
    public resultadoschecklist: ResultadoChecklist[] = [];
    public columnas: string[] = [];
    public resultado: Object;
    public tabla: Object[] = [];
    public fecha: Object = {inicio: '', fin: ''}

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    ngOnInit() {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id;
                // llamada al servidor para conseguir las checklists
                this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
                    response => {
                        this.checklists = [];
                        this.checklists.push(this.checklist);
                        if (response.success && response.data) {
                            for (let element of response.data) {
                                this.checklists.push(new Checklist(
                                    element.id,
                                    element.idempresa,
                                    element.nombrechecklist
                                ));
                            }
                        }
                });
        });
    }

    cambioChecklist(idChecklist: number) {
        this.checklistSeleccionada = idChecklist;
        let parametros = '&idchecklist=' + idChecklist;
        // llamada al servidor para conseguir las controlchecklist
        this.servidor.getObjects(URLS.CONTROLCHECKLISTS, parametros).subscribe(
            response => {
                this.controlchecklists = [];
                this.columnas = [];
                if (response.success && response.data) {
                    for (let element of response.data) {
                        this.controlchecklists.push(new ControlChecklist(
                            element.id,
                            element.idchecklist,
                            element.nombre
                        ));
                        this.columnas.push(element.nombre);
                    }
                }
        });
    }


    filtrarFechas(fecha) {
        // conseguir resultadoschecklist
        let parametros = '&idchecklist=' + this.checklistSeleccionada + '&fechainicio=' + fecha.inicio + '&fechafin=' + fecha.fin;
        this.servidor.getObjects(URLS.RESULTADOS_CHECKLIST, parametros).subscribe(
            response => {
                this.resultadoschecklist = [];
                this.tabla = [];
                if (response.success && response.data) {
                    for (let element of response.data) {
                        let fecha = new Date(element.fecha);
                            this.resultadoschecklist.push(new ResultadoChecklist(
                                element.idr,
                                element.idcontrol,
                                element.resultado,
                                new Date(element.fecha),
                                element.foto
                            ));
                    }
                }
                for (let element of this.resultadoschecklist) {
                    for (let control of this.checklists) {
                        if (control.id == element.idchecklist) {
                            this.resultado = new Object;
                            this.resultado['id'] = element.idr;
                            this.resultado['fecha'] = element.fecha;
                            this.resultado[control.nombre] = element.resultado;
                            if (element.foto == 'true') {
                                this.resultado['foto'] = true;
                            }
                            this.tabla.push(this.resultado);
                        }
                    }
                }
        });
    }

}

// agrupar por idresultadochecklist
// idcontrolchecklist (item)
