import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionFormComponent } from './atencion-form/atencion-form.component';
import { AtencionListadoComponent } from './atencion-listado/atencion-listado.component';

const routes: Routes = [
  {
    path: 'atencion-listado',
    component: AtencionListadoComponent
  },
  {
    path: 'atencion-form/:id',
    component: AtencionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
