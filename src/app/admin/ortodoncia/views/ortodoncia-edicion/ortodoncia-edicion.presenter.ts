import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrtodonciaHttp } from 'src/app/admin/shared/http';
import { DetOrtodonciaGetResponse, DetOrtodonciaUI, OrtodonciaGetResponse, OrtodonciaRequest, OrtodonciaUI } from 'src/app/admin/shared/model';
import { BaseService, PerfildSweetAlertService } from 'src/app/common';
import { OrtodonciaAddControlSection } from '../../components/ortodoncia-add-control/ortodoncia-add-control.section';
import { EOrtodonciaEstado } from 'src/app/admin/shared/enum';
import { switchMap } from 'rxjs';

@Injectable()
export class OrtodonciaEdicionPresenter {
  nIdOrtodoncia: number;
  ortodoncia: OrtodonciaGetResponse;
  sNomPaciente: string;
  controles: DetOrtodonciaGetResponse[];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private alert: PerfildSweetAlertService,
    private baseServ: BaseService,
    private ortodonciaHttp: OrtodonciaHttp,
  ) {
    this.nIdOrtodoncia = Number(this.activateRoute.snapshot.paramMap.get('nIdOrtodoncia'));
  }

  goOrtodonciaListado(): void {
    this.router.navigateByUrl('/ortodoncia/listado');
  }

  init(): void {
    this.ortodonciaHttp.getOrtodonciaOne(this.nIdOrtodoncia).subscribe(
      res => {
        this.sNomPaciente = res.sNomPaciente;
        this.ortodoncia = res;
        this.controles = res.controles;
      }
    )
  }

  saveOrtodoncia(formDet: DetOrtodonciaUI): void {
    const vDetOrtodoncia: DetOrtodonciaUI[] = [];
    vDetOrtodoncia.push(formDet);
    const vForm: OrtodonciaUI = { nIdOrtodoncia: this.nIdOrtodoncia, detOrtodoncia: vDetOrtodoncia }
    const vRequest = new OrtodonciaRequest(vForm);
    this.ortodonciaHttp.createOrtodoncia(vRequest)
      .pipe(
        switchMap(() => this.ortodonciaHttp.getOrtodonciaOne(this.nIdOrtodoncia))
      )
      .subscribe(
        res => {
          if (res) {
            this.alert.showToast('success');
            this.controles = res.controles;
          }
        }
      );
  }
}
