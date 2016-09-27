import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginFormComponent} from './login/login-form.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './404.component';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'empresas', component: EmpresasComponent},
    {path: '', component: AppComponent},
    {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
