import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrtodonciaRoutingModule } from './ortodoncia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DirectivesModule } from 'src/app/common/directives/directives.module';

import { OrtodonciaListadoComponent } from './ortodoncia-listado/ortodoncia-listado.component';
import { OrtodonciaTableComponent } from './ortodoncia-listado/ortodoncia-table/ortodoncia-table.component';
import { OrtodonciaNuevoComponent } from './ortodoncia-nuevo/ortodoncia-nuevo.component';
import { OrtodonciaNuevoHeaderComponent } from './ortodoncia-nuevo/ortodoncia-nuevo-header/ortodoncia-nuevo-header.component';
import { OrtodonciaNuevoBodyComponent } from './ortodoncia-nuevo/ortodoncia-nuevo-body/ortodoncia-nuevo-body.component';
import { OrtodonciaAddControlComponent } from './ortodoncia-listado/ortodoncia-add-control/ortodoncia-add-control.component';
import { MatDialogModule } from '@angular/material/dialog';

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
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    OrtodonciaListadoComponent,
    OrtodonciaTableComponent,
    OrtodonciaNuevoComponent,
    OrtodonciaNuevoHeaderComponent,
    OrtodonciaNuevoBodyComponent,
    OrtodonciaAddControlComponent
  ],
  imports: [
    CommonModule,
    OrtodonciaRoutingModule,
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ComponentsModule,
    DirectivesModule
  ]
})
export class OrtodonciaModule { }
