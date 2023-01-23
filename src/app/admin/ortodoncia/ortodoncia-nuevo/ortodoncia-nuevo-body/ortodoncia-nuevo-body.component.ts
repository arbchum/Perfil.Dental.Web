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
  @Input() fechaInstalacion: string;
  dataSource: MatTableDataSource<AbstractControl> = new MatTableDataSource();
  displayedColumns: string[] = [];
  sDescrpcionMaxLength: number = 500;

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Nro.', field: 'index', type: 'index', width: '30', align: 'center' },
    { header: 'Descripción', field: 'sDescripcion', type: 'sDescripcion', width: '400', align: 'left' },
    { header: 'Fecha de control', field: 'dFechaControl', type: 'dFechaControl', width: '80', align: 'center' },
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
  }

  indexReverse(index: number): number {
    return this.detOrtodonciaArray.length - index;
  }

  addControlOrtodoncia(): void {
    if(this.fechaInstalacion == ''){
      this.alert.showMessage('warning', 'Seleccione una fecha de ingreso');
      return;
    }
    const pForm = this.detOrtodonciaArray.at(0) as FormGroup;
    if (pForm) {
      if (pForm.invalid) {
        return Object.values(pForm.controls).forEach(control => { control.markAllAsTouched() });
      }
    }
    this.detOrtodonciaArray.insert(0,
      this.fb.group({
        sDescripcion: ['', Validators.required],
        dFechaControl: ['', Validators.required],
        dFechaMin: [this.getFechaRowPrevio(pForm)]
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
    const fechaPrevia = (form) ? form.get('dFechaControl')?.value : this.fechaInstalacion;
    form?.get('dFechaControl')?.disable();
    return moment(fechaPrevia).add(1, 'days').toDate();
  }
}
