import { NgModule } from '@angular/core';
import { TruncateTextPipe } from './truncate-text.pipe';

const PIPES = [
  TruncateTextPipe
]

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES]
})
export class PipesModule { }
