import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { EmpresasComponent } from './components/empresas.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'empresas', component: EmpresasComponent},
  {path: '**', component: EmpresasComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
