import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { TratamientoHttp } from '../../shared/http';
import { Tratamiento } from '../../shared/interface';
import { TratamientoFormComponent } from './tratamiento-form/tratamiento-form.component';

@Component({
  selector: 'app-tratamiento-listado',
  templateUrl: './tratamiento-listado.component.html',
  styleUrls: ['./tratamiento-listado.component.scss']
})
export class TratamientoListadoComponent implements OnInit {
  tratamientos: Tratamiento[];

  constructor(
    private tratamientoHttp: TratamientoHttp,
    private alert: PerfildSweetAlertService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTratamientos();
  }

  listarTratamientos(showMessage?: boolean): void {
    this.alert.showLoading();
    this.tratamientoHttp
      .getTratamientoSearch()
      .subscribe(res => {
        this.alert.closeLoading();
        this.tratamientos = res;
        if (showMessage)
          this.alert.showToast('success');
      });
  }

  operModalTratamientoForm(tratamiento?: Tratamiento): void {
    this.dialog.open(TratamientoFormComponent, {
      width: '400px',
      disableClose: true,
      data: { 'tratamiento': tratamiento }
    }).afterClosed()
      .subscribe((result: Tratamiento) => {
        if (result) {
          result.nIdTratamiento = tratamiento?.nIdTratamiento ?? 0;
          this.saveTratamiento(result);
        }
      });
  }

  saveTratamiento(tratamiento: Tratamiento): void {
    this.alert.showLoading();
    this.tratamientoHttp
      .sendTratamientoCreateOrUpdate(tratamiento)
      .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        if (res) {
          this.listarTratamientos(true);
        }
        else this.alert.showMessage('error')
      });
  }
}
