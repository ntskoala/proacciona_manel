import {Component, Output, EventEmitter} from '@angular/core';
import {EmpresasService} from './empresas.service';
import {Empresa} from './empresa';

@Component({
    selector: 'seleccionar-empresa',
    templateUrl: 'public/assets/templates/seleccionar-empresa.component.html',
    styleUrls: ['public/assets/css/seleccionar-empresa.component.css'],
    providers: [EmpresasService],
})

export class SeleccionarEmpresaComponent {
    
    public empresas: Empresa[] = [];
    private response: any;
    // variable para generar un evento
    @Output() seleccionada: EventEmitter<Empresa> = new EventEmitter();

    constructor(private empresasService: EmpresasService) {
        this.empresasService.getEmpresas().subscribe(
            data => {
                data.forEach(empresa => {
                    this.empresas.push(new Empresa(empresa.idempresa, empresa.nombreempresa));
                })
            })
    }
    // al seleccionar empresa genera event para que lo recoja el padre
    seleccionaEmpresa(seleccion: number){
        this.seleccionada.emit(this.empresas.find(empresa => empresa.id == seleccion));
    }

}
