import { Component } from '@angular/core';

import { EmpresasService } from '../services/empresas.service';
import { Servidor } from '../services/servidor.service';
import { URLS } from '../models/urls';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'nueva-empresa',
  templateUrl: '../../assets/html/nueva-empresa.component.html'
})

export class NuevaEmpresaComponent {

  constructor(private servidor: Servidor, private empresasService: EmpresasService) {}
  
  empresa: Object = {};
  
  nuevaEmpresa(empresa: any) {
    // limpiar form
    this.empresa = {}
    let nuevaEmpresa = new Empresa(empresa.nombre, empresa.nif, 0);
    this.servidor.postObject(URLS.EMPRESAS, nuevaEmpresa).subscribe(
      response => {
        // si tiene éxito
        if (response.success) {
          nuevaEmpresa.id = response.id;
          this.empresasService.empresaCreada(nuevaEmpresa);
          console.log('Empresa creada')
        }
        // usuario erróneo
        else {
          alert('Empresa no creada');
        }
    });
  }

}
