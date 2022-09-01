import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TratamientoListadoComponent } from './tratamiento-listado/tratamiento-listado.component';

const routes: Routes = [
  {
    path: 'listado',
    component: TratamientoListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamientoRoutingModule { }
