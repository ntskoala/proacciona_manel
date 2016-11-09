import { Component } from '@angular/core';

import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'gestion-tablas',
  templateUrl: 'app/assets/html/gestion-tablas.component.html'
})
export class GestionTablasComponent {

  tabs = [true, null, null, null]
  tabActivo: number = 0;
  
  constructor(private empresasService: EmpresasService) {}
  
  cambiarTab(tab: number) {
    this.tabActivo = tab;
    // Quitar true al tab anterior
    this.tabs[this.tabs.indexOf(true)] = null;
    // Poner true en el nuevo tab
    this.tabs[tab] = true;
  }

}
