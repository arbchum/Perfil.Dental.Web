import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TratamientoRoutingModule } from './tratamiento-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratamientoListadoComponent } from './tratamiento-listado/tratamiento-listado.component';
import { TratamientoTableComponent } from './tratamiento-listado/tratamiento-table/tratamiento-table.component';
import { ComponentsModule } from '../shared/components/components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TratamientoFormComponent } from './tratamiento-listado/tratamiento-form/tratamiento-form.component';

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
  MatButtonModule,
  MatTooltipModule,
  MatPaginatorModule,
];


@NgModule({
  declarations: [
    TratamientoListadoComponent,
    TratamientoTableComponent,
    TratamientoFormComponent
  ],
  imports: [
    CommonModule,
    TratamientoRoutingModule,
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ComponentsModule
  ]
})
export class TratamientoModule { }
