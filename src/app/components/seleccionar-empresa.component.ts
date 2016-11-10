import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Servidor } from '../services/servidor.service';
import { EmpresasService } from '../services/empresas.service';
import { URLS } from '../models/urls';
import { Empresa } from '../models/empresa';
import { Modal } from '../models/modal';

@Component({
  selector: 'seleccionar-empresa',
  templateUrl: 'app/assets/html/seleccionar-empresa.component.html'
})

export class SeleccionarEmpresaComponent implements OnInit {
  
  subscription: Subscription;
  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa('Seleccionar empresa', 0);
  modal: Modal = new Modal();
  
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
              element.id
            ))
          }
        }
    });
  }

  selecciona(idEmpresa: number){
    this.empresasService.seleccionarEmpresa(this.empresas.find(emp => emp.id == idEmpresa));
  }

  checkBorrar() {
    if (this.empresasService.seleccionada != 0) {
      this.modal.titulo = 'borrarEmpresaT';
      this.modal.subtitulo = 'borrarEmpresaST';
      this.modal.eliminar = true;
      this.modal.visible = true;
    }
  }

  cerrarModal(event: boolean) {
    this.modal.visible = false;
    if (event) {
      let parametros = '?id=' +  this.empresasService.seleccionada;
      this.servidor.deleteObject(URLS.EMPRESAS, parametros).subscribe(
        response => {
          if (response.success) {
            let empresaBorrar = this.empresas.find(emp => emp.id == this.empresasService.seleccionada);
            let indice = this.empresas.indexOf(empresaBorrar);
            this.empresas.splice(indice, 1);
            this.empresasService.seleccionada = 0;
          }
      });
    }
  }

}
