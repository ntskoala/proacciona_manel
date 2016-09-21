import {Component} from '@angular/core';
import {EmpresasService} from './empresas.service';

@Component({
    selector: 'empresas',
    templateUrl: 'public/assets/templates/empresas.component.html',
    styleUrls: ['public/assets/css/empresas.component.css'],
    providers: [EmpresasService]
})
export class EmpresasComponent {
public empresas:any;
private response:any;
    constructor(private empresasService: EmpresasService) {
        this.empresasService.getEmpresas().subscribe(
            data => {
            this.response = JSON.stringify(data);
            console.log (this.response);
            this.empresas = data;
            }
        );
    };


seleccionaempresa(empresa){
    alert('Empresa seleccionada id: ' + empresa.idempresa + ' nombre: ' + empresa.nombreempresa);
}


}
