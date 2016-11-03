import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Empresa } from '../models/empresa';

@Injectable()
export class EmpresasService {
  // variables
  public seleccionada: number = 0;

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