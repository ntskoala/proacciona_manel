import {Component, Input} from '@angular/core';
import {Empresa} from './empresa'

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'public/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['public/assets/css/tab-usuarios-empresa.component.css']
})

export class TabUsuariosEmpresaComponent {
    // importamos el objeto empresa seleccionada
    @Input() seleccionada: Empresa;

    public usuarios = [
        {nombre: 'Antonio', password: '123456', tipo: 'Administrador', activo: true},
        {nombre: 'Sara', password: 'lkjshs', tipo: 'Normal', activo: true},
        {nombre: 'Xavi', password: '87uyhg', tipo: 'Normal', activo: false}
    ]

}
