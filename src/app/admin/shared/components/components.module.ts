import { NgModule } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageTitleComponent } from './page-title/page-title.component';
import { DialogTratamientoChooseComponent } from './dialog-tratamiento-choose/dialog-tratamiento-choose.component';

const COMPONENTS = [
  PageTitleComponent,
  DialogTratamientoChooseComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [...COMPONENTS]
})
export class ComponentsModule { }
