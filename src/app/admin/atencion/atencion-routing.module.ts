import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionFormComponent } from './atencion-form/atencion-form.component';
import { AtencionListadoComponent } from './atencion-listado/atencion-listado.component';

const routes: Routes = [
  {
    path: 'listado',
    component: AtencionListadoComponent
  },
  {
    path: 'nuevo/:id',
    component: AtencionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
