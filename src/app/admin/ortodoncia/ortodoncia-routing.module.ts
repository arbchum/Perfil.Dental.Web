import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrtodonciaListadoView } from './views/ortodoncia-listado/ortodoncia-listado.view';
import { OrtodonciaNuevoView } from './views/ortodoncia-nuevo/ortodoncia-nuevo.view';
import { OrtodonciaEdicionView } from './views/ortodoncia-edicion/ortodoncia-edicion.view';

const routes: Routes = [
  {
    path: 'listado',
    component: OrtodonciaListadoView
  },
  {
    path: 'nuevo',
    component: OrtodonciaNuevoView
  },
  {
    path: 'edicion/:nIdPaciente',
    component: OrtodonciaEdicionView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciaRoutingModule { }
