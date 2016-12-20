import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { Empresa } from '../models/empresa';
import { URLS } from '../models/urls';
import { Checklist } from '../models/checklist';

import { Modal } from '../models/modal';

@Component({
  selector: 'listado-checklists',
  templateUrl: '../assets/html/listado-checklists.component.html'
})
export class ListadoChecklistsComponent implements OnInit {
  @Input('empresa') empresaSeleccionada: any;
  private subscription: Subscription;
  checklistActiva: number = 0;
  checklist: Checklist = new Checklist(0, 0, 'Seleccionar', 0, '');
  checklists: Checklist[] = [];
  
  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

ngOnInit(){
  this.loadChecklistList(this.empresaSeleccionada);
}

     loadChecklistList(emp: Empresa | string) {
    let params = typeof(emp) == "string" ? emp : emp.id
    let parametros = '&idempresa=' + params;
        //let parametros = '&idempresa=' + seleccionada.id;
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
   }




seleccionarCCL(valor: any){
  console.log('valor de checklist seleccionada', valor);
}
}
