import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionRoutingModule } from './atencion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AtencionListadoComponent } from './atencion-listado/atencion-listado.component';
import { AtencionFormComponent } from './atencion-form/atencion-form.component';
import { ComponentsModule } from '../shared/components/components.module';
import { AtencionTableComponent } from './atencion-listado/atencion-table/atencion-table.component';

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
  MatPaginatorModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    AtencionListadoComponent,
    AtencionFormComponent,
    AtencionTableComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule,
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ComponentsModule
  ]
})
export class AtencionModule { }
