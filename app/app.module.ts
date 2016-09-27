import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdInputModule} from '@angular2-material/input';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdTabsModule} from '@angular2-material/tabs';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {LoginFormComponent} from './login/login-form.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {SeleccionarEmpresaComponent} from './empresas/seleccionar-empresa.component';
import {NuevaEmpresaComponent} from './empresas/nueva-empresa.component';
import {GestionEmpresaComponent} from './empresas/gestion-empresa.component';
import {TabUsuariosEmpresaComponent} from './empresas/tab-usuarios-empresa.component';
import {PageNotFoundComponent} from './404.component';

import {routing, appRoutingProviders} from './app.routing';
import {SeleccionarEmpresaService} from './empresas/seleccionar-empresa.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdToolbarModule,
        MdTabsModule,
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
        PageNotFoundComponent
    ],
    providers: [
        appRoutingProviders,
        SeleccionarEmpresaService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
