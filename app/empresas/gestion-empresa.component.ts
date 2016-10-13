import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';

@Component({
    selector: 'gestion-empresa',
    templateUrl: 'public/assets/templates/gestion-empresa.component.html',
    styleUrls: ['public/assets/css/gestion-empresa.component.css']
})
export class GestionEmpresaComponent {

    private subscription: Subscription;
    public seleccionada: number = 0;
    public tabActivo = 'usuarios';

    constructor(private empresasService: EmpresasService) {
        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionada = seleccionada.id
        )
    }

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}
