import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrtodonciaRoutingModule } from './ortodoncia-routing.module';

import { SharedComponentsModule } from '../shared/components/components.module';

import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { OrtodonciaComponentsModule } from './components/components.module';
import { OrtodonciaListadoView } from './views/ortodoncia-listado/ortodoncia-listado.view';
import { OrtodonciaNuevoView } from './views/ortodoncia-nuevo/ortodoncia-nuevo.view';
import { OrtodonciaEdicionView } from './views/ortodoncia-edicion/ortodoncia-edicion.view';
import { BaseModule } from 'src/app/common';

@NgModule({
  declarations: [
    OrtodonciaListadoView,
    OrtodonciaNuevoView,
    OrtodonciaEdicionView
  ],
  imports: [
    CommonModule,
    OrtodonciaRoutingModule,
    OrtodonciaComponentsModule,
    SharedComponentsModule,
    BaseModule
  ]
})
export class OrtodonciaModule { }
