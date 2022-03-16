import { IsloggedGuard } from './services/auth/islogged.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsloggedGuard]
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    canActivate: [IsloggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: CadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'redirect'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
