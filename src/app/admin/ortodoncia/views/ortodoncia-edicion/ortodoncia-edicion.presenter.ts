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
  nIdPaciente: number;
  paciente: string;
  sNomPaciente: string;
  sesiones: DetOrtodonciaGetResponse[];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private alert: PerfildSweetAlertService,
    private baseServ: BaseService,
    private ortodonciaHttp: OrtodonciaHttp,
  ) {
    this.nIdPaciente = Number(this.activateRoute.snapshot.paramMap.get('nIdPaciente'));
  }

  goOrtodonciaListado(): void {
    this.router.navigateByUrl('/ortodoncia/listado');
  }

  init(): void {
    this.ortodonciaHttp.getOrtodonciaOne(this.nIdPaciente).subscribe(
      res => {
        this.sNomPaciente = res.sNomPaciente;
        this.paciente = `${res.sCodigo} - ${res.sNomPaciente}`;
        this.sesiones = res.sesiones;
      }
    )
  }

  saveOrtodoncia(formDet: DetOrtodonciaUI): void {
    const vDetOrtodoncia: DetOrtodonciaUI[] = [];
    vDetOrtodoncia.push(formDet);
    const vForm: OrtodonciaUI = { nIdPaciente: this.nIdPaciente, detOrtodoncia: vDetOrtodoncia }
    const vRequest = new OrtodonciaRequest(vForm, EOrtodonciaEstado.EnTratamiento);
    this.ortodonciaHttp.createOrtodoncia(vRequest)
      .pipe(
        switchMap(() => this.ortodonciaHttp.getOrtodonciaOne(this.nIdPaciente))
      )
      .subscribe(
        res => {
          if (res) {
            this.alert.showToast('success');
            this.sesiones = res.sesiones;
          }
        }
      );
  }
}
