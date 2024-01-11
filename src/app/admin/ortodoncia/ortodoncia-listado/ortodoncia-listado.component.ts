import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { OrtodonciaHttp } from '../../shared/http';
import { DetOrtodonciaDataDto, OrtodonciaDataDto } from '../../shared/interface';
import { DetOrtodonciaRequest, OrtodonciaRequest, OrtodonciaUI } from '../../shared/model';
import { OrtodonciaTableComponent } from './ortodoncia-table/ortodoncia-table.component';
import { EOrtodonciaEstado } from '../../shared/enum/ortodoncia-estado.enum';

@Component({
  selector: 'app-ortodoncia-listado',
  templateUrl: './ortodoncia-listado.component.html',
  styleUrls: ['./ortodoncia-listado.component.scss']
})
export class OrtodonciaListadoComponent implements OnInit {
  @ViewChild(OrtodonciaTableComponent, { static: true }) compTable: OrtodonciaTableComponent;
  ortodoncias: OrtodonciaDataDto[];
  detOrtodoncia: DetOrtodonciaDataDto[];

  constructor(
    private ortodonciaHttp: OrtodonciaHttp,
    private router: Router,
    private alert: PerfildSweetAlertService
  ) { }

  ngOnInit(): void {
    this.listarOrtodoncias();
  }

  listarOrtodoncias(): void {
    this.ortodonciaHttp.getOrtodonciaSearch().subscribe(
      res => {
        this.ortodoncias = res;
      }
    );
  }

  goOrtodonciaForm(): void {
    this.router.navigateByUrl('/ortodoncia/nuevo');
  }


  listarDetOrtodoncia(ortodoncia: OrtodonciaDataDto): void {
    this.detOrtodoncia = []
    this.ortodonciaHttp.getDetailOrtodoncia(ortodoncia.nIdPaciente, 3).subscribe(
      res => this.detOrtodoncia = res
    );
  }

  UpdateOrtodoncia(form: OrtodonciaUI): void {
    const vRequest = new OrtodonciaRequest(form, EOrtodonciaEstado.EnTratamiento);
    this.ortodonciaHttp.createOrtodoncia(vRequest)
      .pipe(
        switchMap(() => this.ortodonciaHttp.getOrtodonciaSearch())
      )
      .subscribe(
        res => {
          if (res) {
            this.alert.showToast('success');
            this.ortodoncias = res;
            const vRow = this.ortodoncias.find(res => res.nIdPaciente == vRequest.nIdPaciente);
            if (vRow) {
              this.compTable.openDetail(vRow);
              this.listarDetOrtodoncia(vRow);
            }
          }
        }
      );
  }
}
