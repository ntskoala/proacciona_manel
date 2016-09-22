import {Component, Output, EventEmitter} from '@angular/core';
import {Empresa} from './empresa';

@Component({
    selector: 'empresas',
    templateUrl: 'public/assets/templates/empresas.component.html',
    styleUrls: ['public/assets/css/empresas.component.css'],
})

export class EmpresasComponent {

    @Output() seleccionada: EventEmitter<Empresa> = new EventEmitter();

    seleccion(empresa: Empresa) {
        this.seleccionada.emit(empresa)
    }

}
