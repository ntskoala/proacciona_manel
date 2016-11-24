import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Empresa } from '../models/empresa';

@Injectable()
export class EmpresasService {
  // variables
  idioma: string = 'cat';
  seleccionada: number = 0;
  administrador: boolean = false;
  empresaActiva: number;

  // fuente del observable
  private empresaSeleccionadaFuente = new Subject<Empresa>();
  private nuevaEmpresaFuente = new Subject<Empresa>();
  
  // streaming del observable
  empresaSeleccionada = this.empresaSeleccionadaFuente.asObservable();
  nuevaEmpresa = this.nuevaEmpresaFuente.asObservable();

  seleccionarEmpresa(empresa: Empresa) {
      this.seleccionada = empresa.id;
      this.empresaSeleccionadaFuente.next(empresa);
  }

  empresaCreada(empresa: Empresa) {
      this.nuevaEmpresaFuente.next(empresa);
  }
}
