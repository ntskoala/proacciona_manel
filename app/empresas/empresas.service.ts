import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Empresa} from '../objetos/empresa';
import {Checklist} from '../objetos/checklist';
import {Usuario} from '../objetos/usuario';

@Injectable()
export class EmpresasService {
    // variables
    public seleccionada: number;
    // fuente del observable
    private empresaSeleccionadaFuente = new Subject<Empresa>();
    private nuevaEmpresaFuente = new Subject<Empresa>();
    private checklistSeleccionadaFuente = new Subject<Checklist>();
    private nuevaChecklistFuente = new Subject<Checklist>();
    private usuarioSeleccionadoFuente = new Subject<Usuario>();
    // streaming del observable
    empresaSeleccionada = this.empresaSeleccionadaFuente.asObservable();
    nuevaEmpresa = this.nuevaEmpresaFuente.asObservable();
    checklistSeleccionada = this.checklistSeleccionadaFuente.asObservable();
    nuevaChecklist = this.nuevaChecklistFuente.asObservable();
    usuarioSeleccionado = this.usuarioSeleccionadoFuente.asObservable();

    seleccionarEmpresa(empresa: Empresa) {
        this.seleccionada = empresa.id;
        this.empresaSeleccionadaFuente.next(empresa);
    }
    empresaCreada(empresa: Empresa) {
        this.nuevaEmpresaFuente.next(empresa);
    }
    seleccionarChecklist(checklist: Checklist) {
        this.checklistSeleccionadaFuente.next(checklist);
    }
    checklistCreada(checklist: Checklist) {
        this.nuevaChecklistFuente.next(checklist);
    }
    seleccionarUsuario(usuario: Usuario) {
        this.usuarioSeleccionadoFuente.next(usuario);
    }
}
