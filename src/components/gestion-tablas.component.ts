import { Component } from '@angular/core';

import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'gestion-tablas',
  templateUrl: '../../assets/html/gestion-tablas.component.html'
})
export class GestionTablasComponent {
  public tabActivo = 'usuarios';
  constructor(private empresasService: EmpresasService) {}
  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }
}
