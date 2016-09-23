import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Servidor} from '../servidor';
import {URLS} from '../config';

@Component({
    selector: 'login-form',
    templateUrl: 'public/assets/templates/login-form.component.html',
    styleUrls: ['public/assets/css/login-form.component.css'],
    providers: [Servidor]
})
export class LoginFormComponent {
    // inyección de servidor como propiedad
    constructor(private servidor: Servidor, public router: Router) {};

    public active = true;
    private response: any;

    onSubmit(nombre: string, password: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let parametros = 'user=' + nombre + '&password=' + password; 

        this.servidor.llamadaServidor('POST', URLS.LOGIN, parametros).subscribe(
            (data) => {
                this.response = JSON.parse(data);
                // si el usuario es correcto
                if (this.response.success) {
                    // guarda los valores en Session Storage
                    sessionStorage.setItem('token', this.response.token);
                    sessionStorage.setItem('usuario', this.response.data[0].usuario);
                    sessionStorage.setItem('empresa', this.response.data[0].idempresa);
                    // redirecciona a home
                    this.router.navigate(['home']);
                }
                // usuario erróneo
                else { // NO FUNCIONA
                    alert('Usuario no válido');
                }
        })
    }

}
