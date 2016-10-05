import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Empresa} from './empresa';
import {Checklist} from './checklist';

@Injectable()
export class EmpresasService {
    // Fuente del observable
    private empresaSeleccionadaFuente = new Subject<Empresa>();
    private nuevaEmpresaFuente = new Subject<Empresa>();
    private nuevaChecklistFuente = new Subject<Checklist>();
    // Streaming del observable
    empresaSeleccionada = this.empresaSeleccionadaFuente.asObservable();
    nuevaEmpresa = this.nuevaEmpresaFuente.asObservable();
    nuevaChecklist = this.nuevaChecklistFuente.asObservable();

    seleccionar(empresa: Empresa) {
        this.empresaSeleccionadaFuente.next(empresa);
    }
    empresaCreada(empresa: Empresa) {
        this.nuevaEmpresaFuente.next(empresa);
    }
    checklistCreada(checklist: Checklist) {
        this.nuevaChecklistFuente.next(checklist);
    }
}
