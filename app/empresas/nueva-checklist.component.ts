import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor.service';
import {URLS} from '../config';
import {Checklist} from './checklist';

@Component({
    selector: 'nueva-checklist',
    templateUrl: 'public/assets/templates/nueva-checklist.component.html',
    styleUrls: ['public/assets/css/nueva-checklist.component.css']
})
export class NuevaChecklistComponent {

    private subscription: Subscription;
    public seleccionada: number;

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => this.seleccionada = seleccionada.id
        );
    }

    public active: boolean = true;

    nuevaChecklist(nombre: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let token = sessionStorage.getItem('token');
        let nuevaChecklist = new Checklist(0, this.seleccionada, nombre);
        let parametros = JSON.stringify(nuevaChecklist);

        this.servidor.llamadaServidor('POST', URLS.CHECKLISTS, parametros).subscribe(
            data => {
                let response = JSON.parse(data.json());
                // si tiene éxito
                if (response.success) {
                    this.empresasService.checklistCreada(nuevaChecklist);
                    console.log('Checklist creada');
                }
                // checklist errónea
                else {
                    alert('Checklist no creada');
                }
        });
    }

}
