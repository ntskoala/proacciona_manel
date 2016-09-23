import {Component, Input, OnInit} from '@angular/core';
import {Empresa} from './empresa'

import {Servidor} from '../servidor';
import {URLS} from '../config';
import {Usuario} from '../login/usuario';

@Component({
    selector: 'tab-usuarios-empresa',
    templateUrl: 'public/assets/templates/tab-usuarios-empresa.component.html',
    styleUrls: ['public/assets/css/tab-usuarios-empresa.component.css'],
    providers: [Servidor]
})

export class TabUsuariosEmpresaComponent implements OnInit{

    constructor(private servidor: Servidor) {}

    // importamos el objeto empresa seleccionada
    @Input() seleccionada: Empresa;

    public usuarios: Usuario[] = [];

    ngOnInit() {
        let token = sessionStorage.getItem('token');
        let parametros = 'idempresa=' + this.seleccionada.id + '&token=' + token; 

        this.servidor.llamadaServidor('GET', URLS.USUARIOS_EMPRESA, parametros).subscribe(
            (data) => {
                let response = JSON.parse(data.json());
                if (response.success) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.usuarios.push(new Usuario(
                            response.data[i].idusuario,
                            response.data[i].usuario,
                            response.data[i].password,
                            response.data[i].tipouser,
                            response.data[i].nombre,
                            response.data[i].idempresa
                        ))
                    }
                }
            }
        )

    }

    cambioTipo(tipo: string) {
        console.log(tipo);
    }
}
