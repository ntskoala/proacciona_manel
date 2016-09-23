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
        {id: 1, nombre: 'Antonio', password: '123456', tipo: 'Administrador', activo: true},
        {id: 2, nombre: 'Sara', password: 'lkjshs', tipo: 'Normal', activo: true},
        {id: 3, nombre: 'Xavi', password: '87uyhg', tipo: 'Administrador', activo: false}
    ]

    cambioTipo(tipo: string) {
        console.log(tipo);
    }
}
