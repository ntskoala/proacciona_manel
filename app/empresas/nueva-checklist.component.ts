import {Component} from '@angular/core';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Checklist} from './checklist';

@Component({
    selector: 'nueva-checklist',
    templateUrl: 'public/assets/templates/nueva-checklist.component.html',
    styleUrls: ['public/assets/css/nueva-checklist.component.css'],
    providers: [Servidor]
})
export class NuevaChecklistComponent {

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    public active: boolean = true;

}
