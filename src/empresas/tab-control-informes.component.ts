import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {ResultadoControl} from '../objetos/resultadocontrol';

@Component({
    selector: 'tab-control-informes',
    templateUrl: 'src/assets/templates/tab-control-informes.component.html',
    styleUrls: ['src/assets/css/tab-control-informes.component.css']
})
export class TabControlInformesComponent implements OnInit {

    private subscription: Subscription;
    public controles: any[] = [];
    public resultadoscontrol: ResultadoControl[] = [];
    public columnas: string[] = [];
    public resultado: Object;
    public tabla: Object[] = [];
    public fecha: Object = {}

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    ngOnInit() {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id; 
                this.servidor.getObjects(URLS.CONTROLES, parametros).subscribe(
                    response => {
                        this.controles = [];
                        this.columnas = [];
                        this.tabla = [];
                        if (response.success && response.data) {
                            for (let element of response.data) {
                                this.controles.push({
                                    id: element.id,
                                    nombre: element.nombre
                                });
                                this.columnas.push(element.nombre);
                            }
                        }
                });
        });
    }

    filtrarFechas(fecha) {
        // conseguir resultadoscontrol
        let parametros = '&idempresa=' + this.empresasService.seleccionada + '&fechainicio=' + fecha.inicio + '&fechafin=' + fecha.fin;
        this.servidor.getObjects(URLS.RESULTADOS_CONTROL, parametros).subscribe(
            response => {
                this.resultadoscontrol = [];
                this.tabla = [];
                if (response.success && response.data) {
                    for (let element of response.data) {
                        let fecha = new Date(element.fecha);
                            this.resultadoscontrol.push(new ResultadoControl(
                                element.idr,
                                element.idcontrol,
                                element.resultado,
                                new Date(element.fecha),
                                element.foto
                            ));
                    }
                }
                for (let element of this.resultadoscontrol) {
                    for (let control of this.controles) {
                        if (control.id == element.idcontrol) {
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
