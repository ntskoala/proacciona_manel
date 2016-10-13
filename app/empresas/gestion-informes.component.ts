import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';

@Component({
    selector: 'gestion-informes',
    templateUrl: 'public/assets/templates/gestion-informes.component.html',
    styleUrls: ['public/assets/css/gestion-informes.component.css']
})
export class GestionInformesComponent {

    private subscription: Subscription;
    public seleccionada: number = 0;
    public tabActivo = 'controles';

    constructor(private empresasService: EmpresasService) {
        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionada = seleccionada.id
        )
    }

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}
