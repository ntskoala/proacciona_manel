import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {EmpresasService} from './empresas.service';
import {Servidor} from './servidor.service';
import {URLS} from '../config';
import {Usuario} from '../objetos/usuario';

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'src/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['src/assets/css/tab-usuarios-empresa.component.css']
})
export class TabUsuariosEmpresaComponent implements OnInit {

    private subscription: Subscription;
    public usuarios: Usuario[] = [];
    public guardar = [];
    public nuevoUsuario: Object = {usuario: '', password: '', tipouser: 'Normal'};
    public idBorrar: number;
    public modal: boolean = false;


    constructor(private servidor: Servidor, private empresasService: EmpresasService) {}

    ngOnInit() {
        this.subscription = this.empresasService.empresaSeleccionada.subscribe(
            seleccionada => {
                let parametros = '&idempresa=' + seleccionada.id;
                // llamada al servidor para conseguir los usuarios
                this.servidor.getObjects(URLS.USUARIOS, parametros).subscribe(
                    response => {
                        this.usuarios = [];
                        if (response.success && response.data) {
                            for (let element of response.data) {
                                this.usuarios.push(new Usuario(
                                    element.id,
                                    element.usuario,
                                    element.password,
                                    element.tipouser,
                                    element.nombre,
                                    element.idempresa
                                ))
                                this.guardar[element.id] = false;
                            }
                        }
                });
        });
    }

    crearUsuario(usuario) {
        let usuarioCrear = new Usuario(0, usuario.usuario, usuario.password,
            usuario.tipouser, '', this.empresasService.seleccionada);
        this.servidor.postObject(URLS.USUARIOS, usuarioCrear).subscribe(
            response => {
                if (response.success) {
                    usuarioCrear.id = response.id;
                    this.usuarios.push(usuarioCrear);
                }
        });
        // limpiar form
        this.nuevoUsuario = {usuario: '', password: '', tipouser: 'Normal'}  
    }

    checkBorrar(idBorrar: number) {
        this.modal = true;
        this.idBorrar = idBorrar;
    }

    noBorrar() {
        this.modal = false;
    }

    borrarUsuario() {
        let parametros = '?id=' + this.idBorrar;
        this.servidor.deleteObject(URLS.USUARIOS, parametros).subscribe(
            response => {
                if (response.success) {
                    let usuarioBorrar = this.usuarios.find(usuario => usuario.id == this.idBorrar);
                    let indice = this.usuarios.indexOf(usuarioBorrar);
                    this.usuarios.splice(indice, 1);
                    this.modal = false;
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
