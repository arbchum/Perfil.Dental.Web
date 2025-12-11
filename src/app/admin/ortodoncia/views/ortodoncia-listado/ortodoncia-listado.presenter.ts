import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EOrtodonciaEstado } from 'src/app/admin/shared/enum';
import { OrtodonciaHttp } from 'src/app/admin/shared/http';
import { DetOrtodonciaDataDto, OrtodonciaDataDto } from 'src/app/admin/shared/interface';
import { OrtodonciaRequest, OrtodonciaUI } from 'src/app/admin/shared/model';
import { PerfildSweetAlertService } from 'src/app/common';
import { OrtodonciaTableSection } from '../../components/ortodoncia-table/ortodoncia-table.section';

@Injectable()
export class OrtodonciaListadoPresenter {
  ortodoncias: OrtodonciaDataDto[];
  detOrtodoncia: DetOrtodonciaDataDto[];

  constructor(
    private ortodonciaHttp: OrtodonciaHttp,
    private router: Router,
    private alert: PerfildSweetAlertService
  ) { }

  listarOrtodoncias(): void {
    this.ortodonciaHttp.getOrtodonciaSearch().subscribe(
      res => {
        this.ortodoncias = res;
      }
    );
  }

  goNewOrtodoncia(): void {
    this.router.navigateByUrl('/ortodoncia/nuevo');
  }

  goEditOrtodoncia(nIdOrtodoncia: number): void {
    this.router.navigateByUrl(`/ortodoncia/edicion/${nIdOrtodoncia}`);
  }

  listarDetOrtodoncia(nIdOrtodoncia: number): void {
    this.detOrtodoncia = []
    this.ortodonciaHttp.getDetailOrtodoncia(nIdOrtodoncia, 3).subscribe(
      res => this.detOrtodoncia = res
    );
  }

  updateOrtodoncia(form: OrtodonciaUI, sectionTable: OrtodonciaTableSection ): void {
    const vRequest = new OrtodonciaRequest(form, EOrtodonciaEstado.EnControles);
    this.ortodonciaHttp.createOrtodoncia(vRequest)
      .pipe(
        switchMap(() => this.ortodonciaHttp.getOrtodonciaSearch())
      )
      .subscribe(
        res => {
          if (res) {
            this.alert.showToast('success');
            this.ortodoncias = res;
            const vRow = this.ortodoncias.find(res => res.nIdOrtodoncia == vRequest.nIdOrtodoncia);
            if (vRow) {
              sectionTable.openDetail(vRow);
              this.listarDetOrtodoncia(vRow.nIdOrtodoncia);
            }
          }
        }
      );
  }
}
