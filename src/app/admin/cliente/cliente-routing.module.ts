import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteHistoricoAtencionComponent } from './cliente-historico-atencion/cliente-historico-atencion.component';
import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ClienteListadoComponent
  },
  {
    path: 'historico/:nIdCliente',
    component: ClienteHistoricoAtencionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
