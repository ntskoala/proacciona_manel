import {Component} from '@angular/core';

import {EmpresasService} from './empresas.service';

@Component({
    selector: 'gestion-empresa',
    templateUrl: 'src/assets/templates/gestion-empresa.component.html',
    styleUrls: ['src/assets/css/gestion-empresa.component.css']
})
export class GestionEmpresaComponent {

    public tabActivo = 'usuarios';

    constructor(private empresasService: EmpresasService) {}

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}