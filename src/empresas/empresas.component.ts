import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'empresas',
    templateUrl: 'src/assets/templates/empresas.component.html',
    styleUrls: ['src/assets/css/empresas.component.css'],
})

export class EmpresasComponent implements OnInit {
    public token = sessionStorage.getItem('token');   
    constructor(private router: Router) {}
    ngOnInit() {
        if (!this.token) {
            this.router.navigate(['login']);
        }
    }
}
