import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {LoginFormComponent} from './login/login-form.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {SeleccionarEmpresaComponent} from './empresas/seleccionar-empresa.component';
import {NuevaEmpresaComponent} from './empresas/nueva-empresa.component';
import {GestionEmpresaComponent} from './empresas/gestion-empresa.component';
import {TabUsuariosEmpresaComponent} from './empresas/tab-usuarios-empresa.component';
import {TabControlesEmpresaComponent} from './empresas/tab-controles-empresa.component';
import {TabChecklistsEmpresaComponent} from './empresas/tab-checklists-empresa.component';
import {MostrarChecklistComponent} from './empresas/mostrar-checklist.component';
import {SeleccionarChecklistComponent} from './empresas/seleccionar-checklist.component';
import {NuevaChecklistComponent} from './empresas/nueva-checklist.component';
import {TabPermisosEmpresaComponent} from './empresas/tab-permisos-empresa.component';
import {PageNotFoundComponent} from './404.component';

import {routing} from './app.routing';
import {EmpresasService} from './empresas/empresas.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        MaterialModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        LoginFormComponent,
        EmpresasComponent,
        SeleccionarEmpresaComponent,
        NuevaEmpresaComponent,
        GestionEmpresaComponent,
        TabUsuariosEmpresaComponent,
        TabControlesEmpresaComponent,
        TabChecklistsEmpresaComponent,
        TabPermisosEmpresaComponent,
        MostrarChecklistComponent,
        SeleccionarChecklistComponent,
        NuevaChecklistComponent,
        PageNotFoundComponent
    ],
    providers: [
        EmpresasService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
