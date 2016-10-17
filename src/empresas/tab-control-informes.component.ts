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

    filtrarFechas(fechaInicio: string, fechaFin: string) {
        // conseguir resultadoscontrol
        let parametros = '&idempresa=' + this.empresasService.seleccionada + '&fechainicio=' + fechaInicio + '&fechafin=' + fechaFin;
        this.servidor.getObjects(URLS.RESULTADOS_CONTROL, parametros).subscribe(
            response => {
                console.log(response);
                this.resultadoscontrol = [];
                this.tabla = [];
                if (response.success && response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        let fecha = new Date(response.data[i].fecha);
                            this.resultadoscontrol.push(new ResultadoControl(
                                response.data[i].id,
                                response.data[i].idcontrol,
                                response.data[i].resultado,
                                new Date(response.data[i].fecha),
                                response.data[i].foto
                            ));
                    }
                }
                for (let i = 0; i < this.resultadoscontrol.length; i++) {
                    for (let x = 0; x < this.controles.length; x++) {
                        if (this.controles[x].id == this.resultadoscontrol[i].idcontrol) {
                            this.resultado = new Object;
                            this.resultado['fecha'] = this.resultadoscontrol[i].fecha;
                            this.resultado[this.controles[x].nombre] = this.resultadoscontrol[i].resultado;
                            this.resultado['foto'] = this.resultadoscontrol[i].foto;
                            this.tabla.push(this.resultado);
                        }
                    }
                }
        });
    }

}
