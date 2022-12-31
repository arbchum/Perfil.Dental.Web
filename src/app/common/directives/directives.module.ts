import { NgModule } from '@angular/core';
import { UppercaseInputDirective } from '.';

const DIRECTIVES = [
  UppercaseInputDirective
]

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES]
})
export class DirectivesModule { }
