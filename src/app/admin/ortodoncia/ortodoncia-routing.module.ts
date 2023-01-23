import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrtodonciaListadoComponent } from './ortodoncia-listado/ortodoncia-listado.component';
import { OrtodonciaNuevoComponent } from './ortodoncia-nuevo/ortodoncia-nuevo.component';

const routes: Routes = [
  {
    path: 'listado',
    component: OrtodonciaListadoComponent
  },
  {
    path: 'nuevo',
    component: OrtodonciaNuevoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciaRoutingModule { }
