import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListarComponent } from './components/listar/listar.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cadastro'},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'listar', component: ListarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
