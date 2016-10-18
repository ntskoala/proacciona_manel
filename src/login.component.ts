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

    public usuario: Object = {user: '', password: ''};

    constructor(private servidor: Servidor, public router: Router) {};

    onSubmit(usuario) {
        // limpiar form
        this.usuario = {user: '', password: ''};        
        // comprobación
        let parametros = '?user=' + usuario.user + '&password=' + usuario.password; 
        this.servidor.login(URLS.LOGIN, parametros).subscribe(
            response => {
                // si el usuario es correcto
                if (response.success && response.success == 'true') {
                    // guarda los valores en Session Storage
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('usuario', response.data[0].usuario);
                    sessionStorage.setItem('empresa', response.data[0].idempresa);
                    // redirecciona a empresas
                    this.router.navigate(['empresas']);
                }
                // usuario erróneo
                else {
                    alert('Usuario no válido');
                }
        });
    }

}
