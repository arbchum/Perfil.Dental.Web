import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionFormComponent } from './atencion-form/atencion-form.component';
import { AtencionListadoComponent } from './atencion-listado/atencion-listado.component';
import { AtencionVerComponent } from './atencion-ver/atencion-ver.component';

const routes: Routes = [
  {
    path: 'listado',
    component: AtencionListadoComponent
  },
  {
    path: 'nuevo',
    component: AtencionFormComponent
  },
  {
    path: 'ver/:id',
    component: AtencionVerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
