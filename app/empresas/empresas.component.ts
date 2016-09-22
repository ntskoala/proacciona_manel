import {Component} from '@angular/core';
import {Empresa} from './empresa';

@Component({
    selector: 'empresas',
    templateUrl: 'public/assets/templates/empresas.component.html',
    styleUrls: ['public/assets/css/empresas.component.css'],
})

export class EmpresasComponent {

    public seleccionada: Empresa;

    seleccion(empresa: Empresa) {
        this.seleccionada = empresa
    }

}
