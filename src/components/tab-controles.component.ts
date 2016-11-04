import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Control } from '../models/control';
import { Modal } from '../models/modal';

@Component({
  selector: 'tab-controles',
  templateUrl: '../../assets/html/tab-controles.component.html'
})

export class TabControlesComponent implements OnInit {

  private subscription: Subscription;
  controles: Control[] = [];
  active: boolean = true;
  guardar = [];
  nuevoControl: Object = {};
  idBorrar: number;
  modal: Modal = new Modal();


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
    // Guardar el id del control a borrar
    this.idBorrar = idBorrar;
    // Crea el modal
    this.modal.titulo = '¿Estás seguro de querer eliminar el control?';
    this.modal.subtitulo = 'Se borrarán los resultados asociados al control y los permisos de los usuarios.';
    this.modal.eliminar = true;
    this.modal.visible = true;
  }

  cerrarModal(event: boolean) {
    this.modal.visible = false;
    if (event) {
      let parametros = '?id=' + this.idBorrar;
      this.servidor.deleteObject(URLS.CONTROLES, parametros).subscribe(
        response => {
          if (response.success) {
            let controlBorrar = this.controles.find(control => control.id == this.idBorrar);
            let indice = this.controles.indexOf(controlBorrar);
            this.controles.splice(indice, 1);
          }
      });
    }
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
