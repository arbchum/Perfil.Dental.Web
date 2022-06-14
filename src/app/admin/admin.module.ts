import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PerfildSweetAlertModule } from '../common';
import { ClienteModule } from './cliente/cliente.module';
import { AdminHttpModule } from './shared/http/http.module';
import { ComponentsModule } from './shared/components/components.module';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule
];

const LIB_MODULES = [
  PerfildSweetAlertModule,
  AdminHttpModule,
  ClienteModule
];


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ...MATERIAL_MODULES,
    ...LIB_MODULES
  ]
})
export class AdminModule { }
