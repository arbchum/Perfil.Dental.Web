import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';

const routes: Routes = [
  {
    path: 'cliente-listado',
    component: ClienteListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
