import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Empresa} from './empresa';

@Injectable()
export class SeleccionarEmpresaService {
    // Fuente del observable
    private nuevaEmpresaFuente = new Subject<Empresa>();
    // Streaming del observable
    nuevaEmpresa = this.nuevaEmpresaFuente.asObservable();

    seleccionar(empresa: Empresa) {
        this.nuevaEmpresaFuente.next(empresa);
    }
}
