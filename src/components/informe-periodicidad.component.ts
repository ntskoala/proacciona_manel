import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Control } from '../models/control';

@Component({
  selector: 'informe-periodicidad',
  templateUrl: '../../assets/html/informe-periodicidad.component.html'
})
export class InformePeriodicidadComponent {

  private subscription: Subscription;
  tabla: any[] = [];
  fecha: Object = {inicio: '2016-10-01', fin: '2016-11-30'};

  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  filtrarFechas(fecha) {
    let parametros = '&idempresa=' + this.empresasService.seleccionada;
    // Conseguir controles
    this.servidor.getObjects(URLS.CONTROLES, parametros).subscribe(
      response => {
        this.tabla = [];
        if (response.success && response.data) {
          for (let element of response.data) {
            let parametros = '&idcontrol=' + element.id + '&fecha=' + fecha.inicio;
            this.servidor.getObjects(URLS.PERIODICIDAD_CONTROL, parametros).subscribe(
              response => {
                if (response.data) {
                  this.tabla.push({nombre: element.nombre, resultado: true});
                } else {
                  this.tabla.push({nombre: element.nombre, resultado: false});
                }
            });
          }
        }
    });
    // Conseguir checklists
    this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
      response => {
        this.tabla = [];
        if (response.success && response.data) {
          for (let element of response.data) {
            let parametros = '&idchecklist=' + element.id + '&fecha=' + Date.now();
            this.servidor.getObjects(URLS.PERIODICIDAD_CHECKLIST, parametros).subscribe(
              response => {
                if (response.data) {
                  this.tabla.push({nombre: element.nombrechecklist, resultado: true});
                } else {
                  this.tabla.push({nombre: element.nombrechecklist, resultado: false});
                }
            });
          }
        }
    });

  }

}
