import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './404.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'empresas', component: EmpresasComponent},
    {path: '', component: AppComponent},
    {path: '**', component: PageNotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
