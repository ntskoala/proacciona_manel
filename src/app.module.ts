import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav.component';
import { LoginComponent } from './components/login.component';
import { EmpresasComponent } from './components/empresas.component';
import { SeleccionarEmpresaComponent } from './components/seleccionar-empresa.component';
import { NuevaEmpresaComponent } from './components/nueva-empresa.component';
import { GestionTablasComponent } from './components/gestion-tablas.component';
import { GestionInformesComponent } from './components/gestion-informes.component';
import { TabUsuariosComponent } from './components/tab-usuarios.component';
import { TabControlesComponent } from './components/tab-controles.component';
import { TabChecklistsEmpresaComponent } from './components/tab-checklists-empresa.component';
import { TabPermisosEmpresaComponent } from './components/tab-permisos-empresa.component';
import { TabControlInformesComponent } from './components/tab-control-informes.component';
import { TabChecklistInformesComponent } from './components/tab-checklist-informes.component';
import { TabPeriodicidadInformesComponent } from './components/tab-periodicidad-informes.component';

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
    EmpresasComponent,
    SeleccionarEmpresaComponent,
    NuevaEmpresaComponent,
    GestionTablasComponent,
    GestionInformesComponent,
    TabUsuariosComponent,
    TabControlesComponent,
    TabChecklistsEmpresaComponent,
    TabPermisosEmpresaComponent,
    TabControlInformesComponent,
    TabChecklistInformesComponent,
    TabPeriodicidadInformesComponent
  ],
  providers: [
    Servidor,
    EmpresasService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
