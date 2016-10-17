import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {NavComponent} from './nav.component';
import {LoginComponent} from './login.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {SeleccionarEmpresaComponent} from './empresas/seleccionar-empresa.component';
import {NuevaEmpresaComponent} from './empresas/nueva-empresa.component';
import {GestionEmpresaComponent} from './empresas/gestion-empresa.component';
import {GestionInformesComponent} from './empresas/gestion-informes.component';
import {TabUsuariosEmpresaComponent} from './empresas/tab-usuarios-empresa.component';
import {TabControlesEmpresaComponent} from './empresas/tab-controles-empresa.component';
import {TabChecklistsEmpresaComponent} from './empresas/tab-checklists-empresa.component';
import {TabPermisosEmpresaComponent} from './empresas/tab-permisos-empresa.component';
import {TabControlInformesComponent} from './empresas/tab-control-informes.component';
import {TabChecklistInformesComponent} from './empresas/tab-checklist-informes.component';
import {TabPeriodicidadInformesComponent} from './empresas/tab-periodicidad-informes.component';
import {PageNotFoundComponent} from './404.component';

import {routing} from './app.routing';
import {Servidor} from './empresas/servidor.service';
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
        NavComponent,
        LoginComponent,
        EmpresasComponent,
        SeleccionarEmpresaComponent,
        NuevaEmpresaComponent,
        GestionEmpresaComponent,
        GestionInformesComponent,
        TabUsuariosEmpresaComponent,
        TabControlesEmpresaComponent,
        TabChecklistsEmpresaComponent,
        TabPermisosEmpresaComponent,
        TabControlInformesComponent,
        TabChecklistInformesComponent,
        TabPeriodicidadInformesComponent,
        PageNotFoundComponent
    ],
    providers: [
        Servidor,
        EmpresasService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
