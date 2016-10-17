import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Servidor} from './empresas/servidor.service';
import {URLS} from './config';

@Component({
    selector: 'login',
    templateUrl: 'src/assets/templates/login.component.html',
    styleUrls: ['src/assets/css/login.component.css']
})
export class LoginComponent {

    public active = true;

    constructor(private servidor: Servidor, public router: Router) {};

    onSubmit(nombre: string, password: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let parametros = '?user=' + nombre + '&password=' + password; 
        this.servidor.login(URLS.LOGIN, parametros).subscribe(
            response => {
                // si el usuario es correcto
                if (response.success) {
                    // guarda los valores en Session Storage
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('usuario', response.data[0].usuario);
                    sessionStorage.setItem('empresa', response.data[0].idempresa);
                    // redirecciona a home
                    this.router.navigate(['empresas']);
                }
                // usuario erróneo
                else {
                    alert('Usuario no válido');
                }
        });
    }

}
