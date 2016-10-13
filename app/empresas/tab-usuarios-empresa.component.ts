import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Usuario} from '../objetos/usuario';

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'public/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['public/assets/css/tab-usuarios-empresa.component.css']
})
export class TabUsuariosEmpresaComponent {

    private subscription: Subscription;
    public usuarios: Usuario[] = [];
    public active: boolean = true;
    public guardar = [];

    constructor(private servidor: Servidor, private empresasService: EmpresasService) {

        this.subscription = empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id;
                // llamada al servidor para conseguir los usuarios
                this.servidor.getObjects(URLS.USUARIOS, parametros).subscribe(
                    response => {
                        this.usuarios = [];
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

        let nuevoUsuario = new Usuario(0, usuario, password, tipo, '', this.empresasService.seleccionada);
        this.servidor.postObject(URLS.USUARIOS, nuevoUsuario).subscribe(
            response => {
                if (response.success) {
                    nuevoUsuario.id = response.id;
                    this.usuarios.push(nuevoUsuario);
                }
        });
    }

    borrarUsuario(idUsuario: number) {
        let parametros = '?id=' + idUsuario;
        this.servidor.deleteObject(URLS.USUARIOS, parametros).subscribe(
            response => {
                if (response.success) {
                    let usuarioBorrar = this.usuarios.find(usuario => usuario.id == idUsuario);
                    let indice = this.usuarios.indexOf(usuarioBorrar);
                    this.usuarios.splice(indice, 1);
                }
        });
    }

    modificarUsuario(idUsuario: number) {
        this.guardar[idUsuario] = true;
    }

    actualizarUsuario(idUsuario: number) {
        this.guardar[idUsuario] = false;
        let modUsuario = this.usuarios.find(usuario => usuario.id == idUsuario);
        let parametros = '?id=' + idUsuario;        
        this.servidor.putObject(URLS.USUARIOS, parametros, modUsuario).subscribe(
            response => {
                if (response.success) {
                    console.log('Usuario modificado');
                }
        });
    }

}
