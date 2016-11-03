import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Servidor } from '../services/servidor.service';
import { EmpresasService } from '../services/empresas.service';
import { URLS } from '../models/urls';

@Component({
  selector: 'login',
  templateUrl: '../../assets/html/login.component.html'
})
export class LoginComponent {

  usuario: Object = {};
  modal: boolean = false;
  mensaje: string;

  constructor(private servidor: Servidor, private router: Router, private empresasService: EmpresasService) {};

  login(usuario) {
    // Limpiar form
    this.usuario = {};        
    // Parámetros
    let param = '?user=' + usuario.user + '&password=' + usuario.password; 
    this.servidor.login(URLS.LOGIN, param).subscribe(
      response => {
        // Si el usuario es correcto
        if (response.success == 'true') {
          // Guarda token en sessionStorage
          sessionStorage.setItem('token', response.token);
          // Redirección en función del tipo de usuario
          switch (response.data[0].tipouser) {
            case 'Administrador':
              console.log('Admin');
              // Redirecciona a empresas
              this.router.navigate(['empresas']);
              break;
            case 'Gerente':
              console.log('Gerente');
              // Redirecciona a página de empresa
              break;
            default:
              console.log('Normal');
              // Se queda en login
              this.mensaje = 'Usuario sin permisos';
              this.modal = true;
          }
        } else {
          // TODO: chequear si la sesión está caducada
          // Usuario erróneo
          this.mensaje = 'Usuario incorrecto';
          this.modal = true;
        }
      }
    );
  }

  cerrarModal() {
    this.modal = false;
  }

}
