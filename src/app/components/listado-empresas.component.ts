import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Servidor } from '../services/servidor.service';
import { EmpresasService } from '../services/empresas.service';
import { URLS } from '../models/urls';
import { Empresa } from '../models/empresa';


@Component({
  selector: 'listado-empresas',
  templateUrl: '../assets/html/listado-empresas.component.html'
})

export class ListadoEmpresasComponent implements OnInit {
  @Output() empresaseleccionada: EventEmitter<Empresa>=new EventEmitter<Empresa>();
  subscription: Subscription;
  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa('Seleccionar empresa', '0', 0);
  formdata: FormData = new FormData();

  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

  ngOnInit() {
    // Subscripción a la creación de nuevas empresa
    this.subscription = this.empresasService.nuevaEmpresa.subscribe(
      empresa => this.empresas.push(empresa)
    );
    // Conseguir la lista de empresas
    this.servidor.getObjects(URLS.EMPRESAS, '').subscribe(
      response => {
        if (response.success) {
          this.empresas.push(this.empresa);
          for (let element of response.data) {
            this.empresas.push(new Empresa(
              element.nombre,
              element.logo,
              element.id
            ))
          }
        }
    });
  }

  selecciona(empresa: Empresa){
  //  this.empresasService.seleccionarEmpresa(this.empresas.find(emp => emp.id == idEmpresa));
  console.log(empresa);  
  this.empresaseleccionada.emit(empresa);
}






}
