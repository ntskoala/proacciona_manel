import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { ResultadoControl } from '../models/resultadocontrol';

@Component({
  selector: 'informe-periodicidad',
  templateUrl: '../../assets/html/informe-periodicidad.component.html'
})
export class InformePeriodicidadComponent {

  private subscription: Subscription;
  controles: any[] = [];
  resultadoscontrol: any[] = [];
  fecha: Object = {inicio: '2016-10-01', fin: '2016-11-30'};

  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  filtrarFechas(fecha) {
    // Conseguir controles
    let parametros = '&idempresa=' + this.empresasService.seleccionada;
    this.servidor.getObjects(URLS.CONTROLES, parametros).subscribe(
      response => {
        this.controles = [];
        if (response.success && response.data) {
          for (let element of response.data) {
            this.controles.push({id: element.id, nombre: element.nombre, periodicidad: element.periodicidad,
              tipoperiodo: element.tipoperiodo});
          }
        }
        console.log(this.controles);
    });
    parametros = '&idempresa=' + this.empresasService.seleccionada +
      '&fechainicio=' + fecha.inicio + '&fechafin=' + fecha.fin;
    this.servidor.getObjects(URLS.RESULTADOS_CONTROL, parametros).subscribe(
      response => {
        this.resultadoscontrol = [];
        if (response.success && response.data) {
          for (let element of response.data) {
            this.resultadoscontrol.push(new ResultadoControl(
              element.idr,
              element.idcontrol,
              parseInt(element.resultado),
              new Date(element.fecha),
              element.foto
            ));
          }
        }
        console.log(this.resultadoscontrol);
    });
  }

}
