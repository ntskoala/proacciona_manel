import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { ResultadoControl } from '../models/resultadocontrol';

@Component({
  selector: 'informe-controles',
  templateUrl: '../../assets/html/informe-controles.component.html',
  styleUrls: ['../../assets/css/informe-controles.component.css']
})
export class InformeControlesComponent implements OnInit {

  private subscription: Subscription;
  controles: any[] = [];
  resultadoscontrol: ResultadoControl[] = [];
  columnas: string[] = [];
  tabla: Object[] = [];
  fecha: Object = {}
  modal: boolean = false;
  fotoSrc: string;

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
                  nombre: element.nombre,
                  minimo: element.valorminimo,
                  maximo: element.valormaximo,
                  tolerancia: element.tolerancia,
                  critico: element.critico
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
                parseInt(element.resultado),
                new Date(element.fecha),
                element.foto
              ));
          }
        }
        for (let element of this.resultadoscontrol) {
          for (let control of this.controles) {
            if (control.id == element.idcontrol) {
              let resultado = new Object;
              resultado['id'] = element.idr;
              resultado['fecha'] = element.fecha;
              resultado[control.nombre] = element.resultado;
              if (element.foto == 'true') {
                resultado['foto'] = true;
              }
              if (resultado[control.nombre] !== '') {
                if (resultado[control.nombre] < control.minimo) {
                  resultado[control.nombre + 'mensaje'] = 'Menor que mínimo';
                }
                if (resultado[control.nombre] > control.maximo) {
                  resultado[control.nombre + 'mensaje'] = 'Mayor que máximo';
                }
                if (resultado[control.nombre] > control.tolerancia) {
                  resultado[control.nombre + 'mensaje'] = 'Mayor que tolerancia';
                }
                if (resultado[control.nombre] > control.critico) {
                  resultado[control.nombre + 'mensaje'] = 'Menor que crítico';
                }
                if (resultado[control.nombre + 'mensaje']) resultado['error'] = true;
              }
              this.tabla.push(resultado);
            }
          }
        }
    });
  }

  ventanaFoto(idResultado: number) {
    this.fotoSrc = 'http://tfc.ntskoala.com/controles/' + this.empresasService.seleccionada + '/control' + idResultado + '.jpg'
    this.modal = true;
  }

  cerrarFoto() {
    this.modal = false;
  }

}
