import {Component, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Empresa} from './empresa'
import {Usuario} from '../login/usuario';

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'public/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['public/assets/css/tab-usuarios-empresa.component.css'],
    providers: [Servidor]
})

export class TabUsuariosEmpresaComponent {

    private subscription: Subscription;
    public seleccionada: number;
    public usuarios: Usuario[] = [];
    public active: boolean = true;
    public guardar = [];

    constructor(
        private servidor: Servidor,
        private empresasService: EmpresasService) {

            this.subscription = empresasService.empresaSeleccionada.subscribe(
                seleccionada => {
                    this.seleccionada = seleccionada.id;
                    let token = sessionStorage.getItem('token');
                    let parametros = '?idempresa=' + seleccionada.id + '&token=' + token; 
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

    crearUsuario(usuario: string, password: string, tipo: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let nuevoUsuario = new Usuario(0, usuario, password, tipo, '', this.seleccionada);
        let parametros = JSON.stringify(nuevoUsuario);

        this.servidor.llamadaServidor('POST', URLS.USUARIOS, parametros).subscribe(
            data => {
                let response = JSON.parse(data);
                if (response.success) {
                    nuevoUsuario.id = response.id;
                    this.usuarios.push(nuevoUsuario);
                }
            }
        );
    }

    borrarUsuario(idUsuario: number) {
        let parametros = '?id=' + idUsuario;
        this.servidor.llamadaServidor('DELETE', URLS.USUARIOS, parametros).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    let usuarioBorrar = this.usuarios.find(usuario => usuario.id == idUsuario);
                    let indice = this.usuarios.indexOf(usuarioBorrar)
                    this.usuarios.splice(indice, 1);
                }
            }
        );
    }

    modificarUsuario(idUsuario: number) {
        this.guardar[idUsuario] = true;
    }

    actualizarUsuario(idUsuario: number) {
        this.guardar[idUsuario] = false;
        let parametros = '?id=' + idUsuario.toString();        
        let modUsuario = this.usuarios.find(usuario => usuario.id == idUsuario);

        this.servidor.llamadaServidor('PUT', URLS.USUARIOS, parametros, modUsuario).subscribe(
            data => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    console.log('Usuario modificado');
                }
            }
        );

    }

}
