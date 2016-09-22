import {Component} from '@angular/core';
import {EmpresasComponent} from './empresas.component';

@Component({
    selector: 'nueva-empresa',
    templateUrl: 'public/assets/templates/nueva-empresa.component.html',
    styleUrls: ['public/assets/css/nueva-empresa.component.css'],
    providers: [EmpresasComponent]
})

export class NuevaEmpresaComponent {
    
    constructor(private empresa:EmpresasComponent) {
        console.log(this.empresa.seleccionada);
    }    

}
