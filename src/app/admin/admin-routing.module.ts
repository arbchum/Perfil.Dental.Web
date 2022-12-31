import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'atencion',
        loadChildren: () => import('./atencion/atencion.module').then((m) => m.AtencionModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then((m) => m.ClienteModule)
      },
      {
        path: 'ortodoncia',
        loadChildren: () => import('./ortodoncia/ortodoncia.module').then((m) => m.OrtodonciaModule)
      },
      {
        path: 'tratamiento',
        loadChildren: () => import('./tratamiento/tratamiento.module').then((m) => m.TratamientoModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
