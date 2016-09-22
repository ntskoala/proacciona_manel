import {Component} from '@angular/core';
import {Empresa} from './empresa';

@Component({
    selector: 'gestion-empresa',
    templateUrl: 'public/assets/templates/gestion-empresa.component.html',
    styleUrls: ['public/assets/css/gestion-empresa.component.css'],
    inputs: ['seleccionada']
})

export class GestionEmpresaComponent {
    public seleccionada: Empresa;
}
