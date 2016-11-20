import { Component } from '@angular/core';

import { Servidor } from '../services/servidor.service';
import { EmpresasService } from '../services/empresas.service';
import { URLS } from '../models/urls';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'nueva-empresa',
  templateUrl: '../assets/html/nueva-empresa.component.html'
})

export class NuevaEmpresaComponent {

  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}
  
  empresa: Empresa = {nombre: ''};
  
  nuevaEmpresa(empresa: Empresa) {
    this.servidor.postObject(URLS.EMPRESAS, empresa).subscribe(
      response => {
        // si tiene éxito
        if (response.success) {
          empresa.id = response.id;
          this.empresasService.empresaCreada(empresa);
          // limpiar form
          this.empresa = {nombre: ''};
        }
        // usuario erróneo
        else {
          alert('Empresa no creada');
        }
    });
  }

}
