import {Component, Input} from '@angular/core';
import {Empresa} from './empresa';
// import {SeleccionarEmpresaComponent} from './seleccionar-empresa.component';

@Component({
    selector: 'gestion-empresa',
    templateUrl: 'public/assets/templates/gestion-empresa.component.html',
    styleUrls: ['public/assets/css/gestion-empresa.component.css'],
})

export class GestionEmpresaComponent {
    
    @Input() seleccionada: Empresa;

}
