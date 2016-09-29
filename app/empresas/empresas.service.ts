import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Empresa} from './empresa';

@Injectable()
export class EmpresasService {
    // Fuente del observable
    private empresaSeleccionadaFuente = new Subject<Empresa>();
    private nuevaEmpresaFuente = new Subject<Empresa>();
    // Streaming del observable
    empresaSeleccionada = this.empresaSeleccionadaFuente.asObservable();
    nuevaEmpresa = this.nuevaEmpresaFuente.asObservable();

    seleccionar(empresa: Empresa) {
        this.empresaSeleccionadaFuente.next(empresa);
    }
    crear(empresa: Empresa) {
        this.nuevaEmpresaFuente.next(empresa);
    }
}
