import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'seleccionar-empresa',
  templateUrl: '../../assets/html/seleccionar-empresa.component.html'
})

export class SeleccionarEmpresaComponent implements OnInit {
  
  subscription: Subscription;
  empresas: Empresa[] = [];
  modal: boolean = false;
  empresa: Empresa = {nombre: 'Seleccionar empresa', cif: '', id: 0};
  
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
              element.cif,
              element.id
            ))
          }
        }
    });
  }

  selecciona(seleccion: number){
    this.empresasService.seleccionarEmpresa(this.empresas.find(empresa => empresa.id == seleccion));
  }

  checkBorrar() {
    if (this.empresasService.seleccionada != 0) {
      this.modal = true;
    }
  }

  noBorrar() {
    this.modal = false;
  }

  borrarEmpresa() {
    let parametros = '?id=' +  this.empresasService.seleccionada;
    this.servidor.deleteObject(URLS.EMPRESAS, parametros).subscribe(
      response => {
        if (response.success) {
          let empresaBorrar = this.empresas.find(empresa => empresa.id == this.empresasService.seleccionada);
          let indice = this.empresas.indexOf(empresaBorrar);
          this.empresas.splice(indice, 1);
          console.log('Empresa eliminada');
          this.empresasService.seleccionada = 0;
          this.modal = false;
        }
    });
  }

}
