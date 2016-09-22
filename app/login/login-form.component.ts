import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

import {User} from './user';

@Component({
    selector: 'login-form',
    templateUrl: 'public/assets/templates/login-form.component.html',
    styleUrls: ['public/assets/css/login-form.component.css'],
    providers: [LoginService]
})
export class LoginFormComponent {
    // inyección de LoginService como propiedad
    constructor(private loginService: LoginService, public router: Router) {};

    public active = true;
    private response: any;

    onSubmit(nombre: string, password: string) {
        // truco de Angular para recargar el form y que se vacíe
        this.active = false;
        setTimeout(() => this.active = true, 0);

        let logingUser = new User(nombre, password);

        this.loginService.logUser(logingUser).subscribe(
            (data) => {
                this.response = JSON.parse(data);
                // si el usuario es correcto
                if (this.response.success) {
                    let user = new User(nombre, password);
                    // TODO: estos parámetros habrá que sustituirlos por los de la respuesta
                    sessionStorage.setItem('usuario', user.nombre);
                    sessionStorage.setItem('empresa', 'empresa1');
                    // redirecciona a home
                    this.router.navigate(['home']);
                }
                // usuario erróneo
                else {
                    alert('Usuario no válido');
                }
            })
        }

}
