import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav.component';
import { LoginComponent } from './components/login.component';
import { EmpresaComponent } from './components/empresa.component';
import { EmpresasComponent } from './components/empresas.component';
import { SeleccionarEmpresaComponent } from './components/seleccionar-empresa.component';
import { NuevaEmpresaComponent } from './components/nueva-empresa.component';
import { GestionTablasComponent } from './components/gestion-tablas.component';
import { GestionInformesComponent } from './components/gestion-informes.component';
import { TabUsuariosComponent } from './components/tab-usuarios.component';
import { TabControlesComponent } from './components/tab-controles.component';
import { TabChecklistsComponent } from './components/tab-checklists.component';
import { TabPermisosComponent } from './components/tab-permisos.component';
import { InformeControlesComponent } from './components/informe-controles.component';
import { InformeChecklistsComponent } from './components/informe-checklists.component';
import { InformePeriodicidadComponent } from './components/informe-periodicidad.component';
import { ModalComponent } from './components/modal.component';
import { PageNotFoundComponent } from './components/404.component';

import { routing } from './app.routing';
import { Servidor } from './services/servidor.service';
import { EmpresasService } from './services/empresas.service';

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
    EmpresaComponent,
    EmpresasComponent,
    SeleccionarEmpresaComponent,
    NuevaEmpresaComponent,
    GestionTablasComponent,
    GestionInformesComponent,
    TabUsuariosComponent,
    TabControlesComponent,
    TabChecklistsComponent,
    TabPermisosComponent,
    InformeControlesComponent,
    InformeChecklistsComponent,
    InformePeriodicidadComponent,
    ModalComponent,
    PageNotFoundComponent
  ],
  providers: [
    Servidor,
    EmpresasService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
