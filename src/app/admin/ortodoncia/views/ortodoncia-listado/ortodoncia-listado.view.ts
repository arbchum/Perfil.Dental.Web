import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { OrtodonciaHttp } from '../../../shared/http';
import { DetOrtodonciaDataDto, OrtodonciaDataDto } from '../../../shared/interface';
import { OrtodonciaRequest, OrtodonciaUI } from '../../../shared/model';
import { OrtodonciaTableSection } from '../../components/ortodoncia-table/ortodoncia-table.section';
import { EOrtodonciaEstado } from '../../../shared/enum/ortodoncia-estado.enum';
import { OrtodonciaListadoPresenter } from './ortodoncia-listado.presenter';

@Component({
  selector: 'app-ortodoncia-listado',
  templateUrl: './ortodoncia-listado.view.html',
  styleUrls: ['./ortodoncia-listado.view.scss'],
  providers: [OrtodonciaListadoPresenter]
})
export class OrtodonciaListadoView implements OnInit {
  @ViewChild(OrtodonciaTableSection, { static: true }) sectionTable: OrtodonciaTableSection;

  constructor(public presenter: OrtodonciaListadoPresenter) { }

  ngOnInit(): void {
    this.presenter.listarOrtodoncias();
  }

  updateOrtodoncia(form: OrtodonciaUI):void{
    this.presenter.updateOrtodoncia(form, this.sectionTable);
  }
}
