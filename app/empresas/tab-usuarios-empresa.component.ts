import {Component, Input} from '@angular/core';
import {Empresa} from './empresa'

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'public/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['public/assets/css/tab-usuarios-empresa.component.css']
})

export class TabUsuariosEmpresaComponent {

    @Input() seleccionada: Empresa;

}
