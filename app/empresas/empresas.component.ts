import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'empresas',
    templateUrl: 'public/assets/templates/empresas.component.html',
    styleUrls: ['public/assets/css/empresas.component.css'],
})

export class EmpresasComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
        let token = sessionStorage.getItem('token');
        if (!token) {
            this.router.navigate(['login']);
        }
    }
}
