import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Checklist } from '../models/checklist';
import { ControlChecklist } from '../models/controlchecklist';

@Component({
  selector: 'tab-checklists',
  templateUrl: '../../assets/html/tab-checklists.component.html'
})
export class TabChecklistsComponent implements OnInit{

  private subscription: Subscription;
  checklistNumber: number = 0;
  checklist: Checklist = new Checklist(0, 0, 'Seleccionar checklist', 0, '');
  checklists: Checklist[] = [];
  controlchecklists: ControlChecklist[] = [];
  ccl: Object = {};
  cl: Object = {};
  guardar = [];
  active: boolean = true;
  modalChecklist: boolean = false;
  modalControlchecklist: boolean = false;
  idBorrar: number;
  
  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  ngOnInit() {
    this.subscription = this.empresasService.empresaSeleccionada.subscribe(
      seleccionada => {
        let parametros = '&idempresa=' + seleccionada.id;
        // llamada al servidor para conseguir las checklists
        this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
          response => {
            // ocultamos mostrar control checklists
            this.checklistNumber = 0;
            // vaciamos la lista actual
            this.checklists = [];
            this.checklists.push(this.checklist);
            if (response.success && response.data) {
              for (let element of response.data) {
                this.checklists.push(new Checklist(
                  element.id,
                  element.idempresa,
                  element.nombrechecklist,
                  element.periodicidad,
                  element.tipoperiodo
                ))
              }
            }
        });
    });
  }

  checkBorrarChecklist() {
    if (this.empresasService.seleccionada != 0) {
      this.modalChecklist = true;
    }
  }

  noBorrarChecklist() {
    this.modalChecklist = false;
  }

  borrarChecklist() {
    let parametros = '?id=' +  this.checklistNumber;
    this.servidor.deleteObject(URLS.CHECKLISTS, parametros).subscribe(
      response => {
        if (response.success) {
          let checklistBorrar = this.checklists.find(checklist => checklist.id == this.checklistNumber);
          let indice = this.checklists.indexOf(checklistBorrar);
          this.checklists.splice(indice, 1);
          this.checklistNumber = 0;                    
          console.log('Checklist eliminada');
          this.modalChecklist = false;
        }
    });
  }

  nuevaChecklist(cl: Checklist) {
    // truco de Angular para recargar el form y que se vacíe
    this.active = false;
    setTimeout(() => this.active = true, 0);
    
    let nuevaChecklist = new Checklist(0, this.empresasService.seleccionada,
      cl.nombrechecklist, cl.periodicidad, cl.tipoperiodo);
    this.servidor.postObject(URLS.CHECKLISTS, nuevaChecklist).subscribe(
      response => {
        // si tiene éxito
        if (response.success) {
          nuevaChecklist.id = response.id;
          this.checklists.push(nuevaChecklist);
          console.log('Checklist creada');
        }
        // checklist errónea
        else {
          alert('Checklist no creada');
        }
    });
  }
  
  mostrarCCL(seleccion: number) {
    let parametros = '&idchecklist=' + seleccion;
    // llamada al servidor para conseguir los controlchecklist
    this.servidor.getObjects(URLS.CONTROLCHECKLISTS, parametros).subscribe(
      response => {
        this.controlchecklists = [];
        if (response.success && response.data) {
          for (let element of response.data) {
            this.controlchecklists.push(new ControlChecklist(
              element.id,
              element.idchecklist,
              element.nombre
            ));
            this.guardar[element.id] = false;
          }
        }
      // mostramos la lista de control checklists
      this.checklistNumber = seleccion;        
    });
  }

  crearCCL(ccl: ControlChecklist) {
    // truco de Angular para recargar el form y que se vacíe
    this.active = false;
    setTimeout(() => this.active = true, 0);

    let nuevoCCL = new ControlChecklist(0, this.checklistNumber, ccl.nombre);
    this.servidor.postObject(URLS.CONTROLCHECKLISTS, nuevoCCL).subscribe(
      response => {
        if (response.success) {
          nuevoCCL.id = response.id;
          this.controlchecklists.push(nuevoCCL);
        }
    });
  }

  checkBorrarControlchecklist(idControlchecklist: number) {
    this.modalControlchecklist = true;
    this.idBorrar = idControlchecklist;
  }

  noBorrarControlchecklist() {
    this.modalControlchecklist = false;
  }

  borrarControlchecklist() {
    let parametros = '?id=' + this.idBorrar;
    this.servidor.deleteObject(URLS.CONTROLCHECKLISTS, parametros).subscribe(
      response => {
        if (response.success) {
          let controlchecklistBorrar = this.controlchecklists.find(controlchecklist => controlchecklist.id == this.idBorrar);
          let indice = this.controlchecklists.indexOf(controlchecklistBorrar);
          this.controlchecklists.splice(indice, 1);
          this.modalControlchecklist = false;
        }
    });
  }

  modificarCCL(idControlchecklist: number) {
    this.guardar[idControlchecklist] = true;
  }
  
  actualizarCCL(idControlchecklist: number) {
    this.guardar[idControlchecklist] = false;
    let modControlchecklist = this.controlchecklists.find(controlchecklist => controlchecklist.id == idControlchecklist);
    let parametros = '?id=' +  idControlchecklist;
    this.servidor.putObject(URLS.CONTROLCHECKLISTS, parametros, modControlchecklist).subscribe(
      response => {
        if (response.success) {
          console.log('Controlchecklist modificado');
        }
    });
  }

}
