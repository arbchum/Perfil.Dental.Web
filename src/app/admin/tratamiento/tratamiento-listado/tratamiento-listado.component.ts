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

  listarTratamientos(): void {
    this.tratamientoHttp.getTratamientoSearch().subscribe(
      res => {
        this.tratamientos = res;
      }
    );
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
    this.tratamientoHttp.sendTratamientoCreateOrUpdate(tratamiento).subscribe(
      res => {
        if (res) {
          this.alert.showToast('success');
          this.listarTratamientos();
        }
        else this.alert.showMessage('error')
      }
    );
  }
}
