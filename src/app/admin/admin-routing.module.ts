import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then((m) => m.ClienteModule)
      },
      {
        path: 'atencion',
        loadChildren: () => import('./atencion/atencion.module').then((m) => m.AtencionModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
