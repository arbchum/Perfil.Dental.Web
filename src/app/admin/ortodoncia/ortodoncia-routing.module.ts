import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrtodonciaListadoComponent } from './ortodoncia-listado/ortodoncia-listado.component';

const routes: Routes = [
  {
    path: 'listado',
    component: OrtodonciaListadoComponent
  },
  // {
  //   path: 'nuevo/:id',
  //   component: AtencionFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciaRoutingModule { }
