import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Empresa} from '../objetos/empresa';

@Component({
    selector: 'seleccionar-empresa',
    templateUrl: 'public/assets/templates/seleccionar-empresa.component.html',
    styleUrls: ['public/assets/css/seleccionar-empresa.component.css']
})

export class SeleccionarEmpresaComponent {
    
    private subscription: Subscription;
    public empresa: Empresa = new Empresa('Seleccionar empresa', '', 0);
    public empresas: Empresa[] = [];
    public modal: boolean = false;
    
    constructor(private servidor: Servidor, private empresasService: EmpresasService) {
        // subscripción a la creación de nuevas empresa
        this.subscription = this.empresasService.nuevaEmpresa.subscribe(
            empresa => this.empresas.push(empresa)
        );
        // conseguir la lista de empresas
        this.empresas.push(this.empresa);
        // this.servidor.llamadaServidor('GET', URLS.EMPRESAS, parametros).subscribe(
        this.servidor.getObjects(URLS.EMPRESAS, '').subscribe(
            response => {
                if (response.success) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.empresas.push(new Empresa(
                            response.data[i].nombre,
                            response.data[i].cif,
                            response.data[i].id
                        ))
                    }
                }
        });

    }

    selecciona(seleccion: number){
        this.empresasService.seleccionarEmpresa(this.empresas.find(empresa => empresa.id == seleccion));
    }

    checkBorrar() {
        if (this.empresasService.seleccionada != 0) {
            this.modal = true;
        }
    }

    noBorrar() {
        this.modal = false;
    }

    borrarEmpresa() {
        let parametros = '?id=' +  this.empresasService.seleccionada;
        this.servidor.deleteObject(URLS.EMPRESAS, parametros).subscribe(
            response => {
                if (response.success) {
                    let empresaBorrar = this.empresas.find(empresa => empresa.id == this.empresasService.seleccionada);
                    let indice = this.empresas.indexOf(empresaBorrar);
                    this.empresas.splice(indice, 1);
                    console.log('Empresa eliminada');
                    this.empresasService.seleccionada = 0;
                    this.modal = false;
                }
        });
    }

}
