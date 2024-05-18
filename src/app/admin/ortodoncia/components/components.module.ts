import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatDialogModule } from '@angular/material/dialog';

import { OrtodonciaTableSection } from './ortodoncia-table/ortodoncia-table.section';
import { OrtodonciaNuevoHeaderSection } from './ortodoncia-nuevo-header/ortodoncia-nuevo-header.section';
import { OrtodonciaNuevoBodySection } from './ortodoncia-nuevo-body/ortodoncia-nuevo-body.section';
import { OrtodonciaAddControlSection } from './ortodoncia-add-control/ortodoncia-add-control.section';
import { OrtodonciaEdicionHeaderSection } from './ortodoncia-edicion-header/ortodoncia-edicion-header.section';
import { OrtodonciaEdicionBodySection } from './ortodoncia-edicion-body/ortodoncia-edicion-body.section';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';

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

const SECTIONS = [
  OrtodonciaTableSection,
  OrtodonciaNuevoHeaderSection,
  OrtodonciaNuevoBodySection,
  OrtodonciaAddControlSection,
  OrtodonciaEdicionHeaderSection,
  OrtodonciaEdicionBodySection
];

@NgModule({
  declarations: [...SECTIONS],
  exports:[
    ...MATERIAL_MODULES,
    ...SECTIONS
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    SharedComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class OrtodonciaComponentsModule { }
