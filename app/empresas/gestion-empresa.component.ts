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
    public seleccionada: boolean = false;
    public tabActivo = 'usuarios';

    constructor(private empresasService: EmpresasService) {
        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionada = true
        )
    }

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}
