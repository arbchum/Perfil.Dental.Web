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
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonPerfilDentalComponent } from './button-perfil-dental/button-perfil-dental.component';

const COMPONENTS = [
  PageTitleComponent,
  DialogTratamientoChooseComponent,
  AutocompleteComponent,
  ButtonPerfilDentalComponent
]

@NgModule({
  declarations: [...COMPONENTS ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  exports: [...COMPONENTS]
})
export class ComponentsModule { }
