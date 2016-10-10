import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Empresa} from '../objetos/empresa';
import {Usuario} from '../objetos/usuario';

@Component({
    selector: 'seleccionar-usuario',
    templateUrl: 'public/assets/templates/seleccionar-usuario.component.html',
    styleUrls: ['public/assets/css/seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent {

    private subscription: Subscription;
    public seleccionada: number;
    public usuarios: Usuario[] = [];
    public active: boolean = true;
    public guardar = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {

        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                this.seleccionada = seleccionada.id;
                let token = sessionStorage.getItem('token');
                let parametros = '?idempresa=' + seleccionada.id + '&token=' + token;
                // llamada al servidor para conseguir los usuarios
                this.servidor.llamadaServidor('GET', URLS.USUARIOS, parametros).subscribe(
                    data => {
                        this.usuarios = [];
                        let response = JSON.parse(data.json());
                        if (response.success && response.data) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.usuarios.push(new Usuario(
                                    response.data[i].id,
                                    response.data[i].usuario,
                                    response.data[i].password,
                                    response.data[i].tipouser,
                                    response.data[i].nombre,
                                    response.data[i].idempresa
                                ))
                                this.guardar[response.data[i].id] = false;
                            }
                        }
                });
        });

    }

}
