import { Component } from '@angular/core';

import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'gestion-informes',
  templateUrl: '../../assets/html/gestion-informes.component.html'
})
export class GestionInformesComponent {
  public tabActivo = 'controles';
  constructor(private empresasService: EmpresasService) {}
  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }
}
