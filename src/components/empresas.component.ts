import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'empresas',
  template: `
    <seleccionar-empresa></seleccionar-empresa>
    <nueva-empresa></nueva-empresa>
    <gestion-tablas></gestion-tablas>
    <gestion-informes></gestion-informes>
  `
})

export class EmpresasComponent implements OnInit {
  public token = sessionStorage.getItem('token');   
  constructor(private router: Router, private empresasService: EmpresasService) {}
  ngOnInit() {
    if (!this.token) {
      this.router.navigate(['login']);
    }
  }
}
