import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Checklist } from '../models/checklist';
import { ControlChecklist } from '../models/controlchecklist';
import { Modal } from '../models/modal';

@Component({
  selector: 'tab-checklists',
  templateUrl: '../../assets/html/checklists.component.html'
})
export class ChecklistsComponent implements OnInit{

  private subscription: Subscription;
  checklistActiva: number = 0;
  checklist: Checklist = new Checklist(0, 0, 'Seleccionar checklist', 0, '');
  checklists: Checklist[] = [];
  controlchecklists: ControlChecklist[] = [];
  cl: Object = {tipoperiodo: 'Día'};
  ccl: Object = {};
  guardar = [];
  idBorrar: number;
  modalCL: Modal = new Modal();
  modalCCL: Modal = new Modal();
  
  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  ngOnInit() {
    this.subscription = this.empresasService.empresaSeleccionada.subscribe(
      seleccionada => {
        let parametros = '&idempresa=' + seleccionada.id;
        // Llamada al servidor para conseguir las checklists
        this.servidor.getObjects(URLS.CHECKLISTS, parametros).subscribe(
          response => {
            // Ocultar mostrar control checklists
            this.checklistActiva = 0;
            // Vaciar la lista actual
            this.checklists = [];
            this.checklists.push(this.checklist);
            if (response.success == 'true' && response.data) {
              for (let element of response.data) {
                this.checklists.push(new Checklist(element.id, element.idempresa, element.nombrechecklist,
                  element.periodicidad, element.tipoperiodo));
              }
            }
        });
    });
  }

  nuevaChecklist(cl: Checklist) {
    // Limpiar el form
    this.cl = {tipoperiodo: 'Día'};
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
  
  checkBorrarCL() {
    if (this.checklistActiva !== 0) {
      this.modalCL.titulo = '¿Estás seguro de querer eliminar la checklist?';
      this.modalCL.subtitulo = 'Se borrarán los resultados asociados a la checklist y los permisos de los usuarios.';
      this.modalCL.eliminar = true;
      this.modalCL.visible = true;
    }
  }

  cerrarModalCL(event: boolean) {
    this.modalCL.visible = false;
    if (event) {
      let parametros = '?id=' +  this.checklistActiva;
      this.servidor.deleteObject(URLS.CHECKLISTS, parametros).subscribe(
        response => {
          if (response.success) {
            let clBorrar = this.checklists.find(cl => cl.id == this.checklistActiva);
            let indice = this.checklists.indexOf(clBorrar);
            this.checklists.splice(indice, 1);
            this.checklistActiva = 0;                    
          }
      });
    }
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
      this.checklistActiva = seleccion;        
    });
  }

  crearCCL(ccl: ControlChecklist) {
    // Limpiar el form
    this.ccl = {};
    let nuevoCCL = new ControlChecklist(0, this.checklistActiva, ccl.nombre);
    this.servidor.postObject(URLS.CONTROLCHECKLISTS, nuevoCCL).subscribe(
      response => {
        if (response.success) {
          nuevoCCL.id = response.id;
          this.controlchecklists.push(nuevoCCL);
        }
    });
  }

  checkBorrarCCL(idCCL: number) {
    this.idBorrar = idCCL;
    this.modalCCL.titulo = '¿Estás seguro de querer eliminar el control checklist?';
    this.modalCCL.subtitulo = 'Se borrarán sus resultados asociados.';
    this.modalCCL.eliminar = true;
    this.modalCCL.visible = true;
  }

  cerrarModalCCL(event: boolean) {
    this.modalCCL.visible = false;
    if (event) {
      let parametros = '?id=' + this.idBorrar;
      this.servidor.deleteObject(URLS.CONTROLCHECKLISTS, parametros).subscribe(
        response => {
          if (response.success) {
            let cclBorrar = this.controlchecklists.find(ccl => ccl.id == this.idBorrar);
            let indice = this.controlchecklists.indexOf(cclBorrar);
            this.controlchecklists.splice(indice, 1);
          }
      });
    }
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
