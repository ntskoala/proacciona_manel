import {Component} from '@angular/core';

import {EmpresasService} from './empresas.service';

@Component({
    selector: 'gestion-informes',
    templateUrl: 'public/assets/templates/gestion-informes.component.html',
    styleUrls: ['public/assets/css/gestion-informes.component.css']
})
export class GestionInformesComponent {

    public tabActivo = 'controles';

    constructor(private empresasService: EmpresasService) {}

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}
