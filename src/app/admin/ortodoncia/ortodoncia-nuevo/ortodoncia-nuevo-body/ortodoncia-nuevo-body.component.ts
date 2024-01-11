import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { PerfildSweetAlertService } from 'src/app/common';

@Component({
  selector: 'app-ortodoncia-nuevo-body',
  templateUrl: './ortodoncia-nuevo-body.component.html',
  styleUrls: ['./ortodoncia-nuevo-body.component.scss']
})
export class OrtodonciaNuevoBodyComponent implements OnInit {
  @Input() detOrtodonciaArray: FormArray;
  dataSource: MatTableDataSource<AbstractControl> = new MatTableDataSource();
  displayedColumns: string[] = [];
  sDescrpcionMaxLength: number = 500;

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Nro.', field: 'index', type: 'index', width: '60', align: 'center' },
    { header: 'Comentario', field: 'sComentario', type: 'sComentario', width: '400', align: 'left' },
    { header: 'Fecha', field: 'dFechaControl', type: 'dFechaControl', width: '80', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '40', align: 'center' }
  ];
  /* #endregion */

  constructor(
    private fb: FormBuilder,
    private alert: PerfildSweetAlertService
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnInit(): void {
    this.addControlOrtodoncia();
  }

  indexReverse(index: number): number {
    return this.detOrtodonciaArray.length - index;
  }

  textControl(nNroSesion: number): string {
    return nNroSesion == 0 ? 'Instalación' : `Control\nNro. ${("00" + nNroSesion).slice(-2)}`;
  }

  addControlOrtodoncia(): void {
    const pForm = this.detOrtodonciaArray.at(0) as FormGroup;
    if (pForm) {
      if (pForm.invalid)
        return Object.values(pForm.controls).forEach(control => { control.markAllAsTouched() });
    }
    this.detOrtodonciaArray.insert(0,
      this.fb.group({
        nNroSesion: [this.detOrtodonciaArray.length],
        sComentario: [null, Validators.required],
        dFechaControl: [null, Validators.required],
        dFechaMin: [pForm ? this.getFechaRowPrevio(pForm) : null]
      })
    );
    this.dataSource = new MatTableDataSource(this.detOrtodonciaArray.controls);
  }

  quitControlOrtodoncia(index: number): void {
    this.detOrtodonciaArray.removeAt(index);
    const vForm = this.detOrtodonciaArray.at(0) as FormGroup;
    vForm?.get('dFechaControl')?.enable();
    this.dataSource = new MatTableDataSource(this.detOrtodonciaArray.controls);
  }

  getFechaRowPrevio(form: FormGroup): Date {
    const fechaPrevia = form.get('dFechaControl')?.value;
    form?.get('dFechaControl')?.disable();
    return moment(fechaPrevia).add(1, 'days').toDate();
  }
}
