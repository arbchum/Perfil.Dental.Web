import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/components/components.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { DirectivesModule } from 'src/app/common/directives/directives.module';

import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { ClienteTableComponent } from './cliente-listado/cliente-table/cliente-table.component';
import { ClienteFormComponent } from './cliente-listado/cliente-form/cliente-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClienteHistoricoAtencionComponent } from './cliente-historico-atencion/cliente-historico-atencion.component';

const ANGULAR_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatPaginatorModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatRadioModule,
  MatCardModule
];

@NgModule({
  declarations: [
    ClienteListadoComponent,
    ClienteTableComponent,
    ClienteFormComponent,
    ClienteHistoricoAtencionComponent
  ],
  imports: [
    ClienteRoutingModule,
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    SharedComponentsModule,
    DirectivesModule
  ],
  exports: [ClienteListadoComponent]
})
export class ClienteModule { }
