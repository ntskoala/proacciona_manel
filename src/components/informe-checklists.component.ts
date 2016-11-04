import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Checklist } from '../models/checklist';
import { ControlChecklist } from '../models/controlchecklist';
import { ResultadoChecklist } from '../models/resultadochecklist';
import { Columna } from '../models/columna';

@Component({
  selector: 'informe-checklists',
  templateUrl: '../../assets/html/informe-checklists.component.html',
  styleUrls: ['../../assets/css/informe-checklists.component.css']
})
export class InformeChecklistsComponent implements OnInit{
  
  private subscription: Subscription;
  public checklistSeleccionada: number = 0;
  public checklist: Checklist = new Checklist(0, 0, 'Seleccionar checklist');
  public checklists: Checklist[];
  public controlchecklists: ControlChecklist[];
  public resultadoschecklist: ResultadoChecklist[];
  public columnas: Columna[];
  public resultado: Object = {};
  public tabla: Object[];
  public fecha: Object = {inicio: '2016-10-16', fin: '2016-10-19'};
  public idrs: string[] = [];

  

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
    this.tabla = [];
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
            this.columnas.push(new Columna(
              'id' + element.id,
              element.nombre
            ));
          }
        }
    });
  }


  filtrarFechas(fecha) {
    this.idrs = [];
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
                element.idcontrolchecklist,
                element.idchecklist,
                element.resultado,
                element.descripcion,
                new Date(element.fecha),
                element.foto
              ));
            if (this.idrs.indexOf(element.idr) == -1) this.idrs.push(element.idr);
          }
        }
        for (let idr of this.idrs) {
          let contador = 0
          for (let resultado of this.resultadoschecklist) {
            if (idr == resultado.idr) {
              this.resultado['id'] = resultado.idr;
              this.resultado['fecha'] = resultado.fecha;
              if (resultado.foto == 'true') this.resultado['foto'] = true;
              this.resultado['id' + resultado.idcontrolchecklist] = resultado.resultado;
              contador++;
            }
          }
          this.tabla.push(this.resultado);
          this.resultado = {};
        }
    });
  }

}
