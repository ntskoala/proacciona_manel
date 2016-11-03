import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Control } from '../models/control';

@Component({
  selector: 'tab-controles-empresa',
  templateUrl: '../../assets/html/tab-controles.component.html'
})

export class TabControlesComponent implements OnInit {

  private subscription: Subscription;
  public controles: Control[] = [];
  public active: boolean = true;
  public guardar = [];
  public nuevoControl: Object = {};
  public idBorrar: number;
  public modal: boolean = false;


  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  ngOnInit() {
    this.subscription = this.empresasService.empresaSeleccionada.subscribe(
      seleccionada => {
        let parametros = '&idempresa=' + seleccionada.id; 
        this.servidor.getObjects(URLS.CONTROLES, parametros).subscribe(
          response => {
            this.controles = [];
            if (response.success && response.data) {
              for (let element of response.data) {
                this.controles.push(new Control(
                  element.id,
                  element.nombre,
                  element.pla,
                  element.valorminimo,
                  element.valormaximo,
                  element.objetivo,
                  element.tolerancia,
                  element.critico,
                  element.periodicidad,
                  element.tipoperiodo,
                  element.idempresa
                ));
                this.guardar[element.id] = false;
              }
            }
        });
    });
  }

  crearControl(nuevoControl: Control) {
    nuevoControl.idempresa = this.empresasService.seleccionada;
    this.servidor.postObject(URLS.CONTROLES, nuevoControl).subscribe(
      response => {
        if (response.success) {
          nuevoControl.id = response.id;
          this.controles.push(nuevoControl);
          this.nuevoControl = {};
        }
    });
  }
  
  checkBorrar(idBorrar: number) {
    this.modal = true;
    this.idBorrar = idBorrar;
  }

  noBorrar() {
    this.modal = false;
  }

  borrarControl() {
    let parametros = '?id=' + this.idBorrar;
    this.servidor.deleteObject(URLS.CONTROLES, parametros).subscribe(
      response => {
        if (response.success) {
          let controlBorrar = this.controles.find(control => control.id == this.idBorrar);
          let indice = this.controles.indexOf(controlBorrar)
          this.controles.splice(indice, 1);
          this.modal = false;
        }
    });
  }

  modificarControl(idControl: number) {
    this.guardar[idControl] = true;
  }

  actualizarControl(idControl: number) {
    this.guardar[idControl] = false;
    let parametros = '?id=' + idControl;        
    let modControl = this.controles.find(control => control.id == idControl);
    this.servidor.putObject(URLS.CONTROLES, parametros, modControl).subscribe(
      response => {
        if (response.success) {
          console.log('Control modificado');
        }
    });
  }

}
