import {Component} from '@angular/core';
import {EmpresasComponent} from './empresas.component';

@Component({
    selector: 'nueva-empresa',
    templateUrl: 'public/assets/templates/nueva-empresa.component.html',
    styleUrls: ['public/assets/css/nueva-empresa.component.css'],
})

export class NuevaEmpresaComponent {
    
    public active = true;
    
    nuevaEmpresa(nombre: string) {
        this.active = false;
        setTimeout(() => this.active = true, 0);

        console.log(nombre);
    }
}
