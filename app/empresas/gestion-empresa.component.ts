import {Component} from '@angular/core';

@Component({
    selector: 'gestion-empresa',
    templateUrl: 'public/assets/templates/gestion-empresa.component.html',
    styleUrls: ['public/assets/css/gestion-empresa.component.css']
})

export class GestionEmpresaComponent {

    public tabActivo = 'usuarios';

    cambiarTab(tab: string) {
        this.tabActivo = tab;
    }

}
