import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tratamiento } from '../../interface';

@Component({
  selector: 'app-dialog-tratamiento-choose',
  templateUrl: './dialog-tratamiento-choose.component.html',
  styleUrls: ['./dialog-tratamiento-choose.component.scss']
})
export class DialogTratamientoChooseComponent implements OnInit {
  dataSource: MatTableDataSource<AbstractControl>;
  displayedColumns: string[] = [];
  form: FormGroup;

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Acción', field: 'accion', type: 'accion', width: '50', align: 'center' },
    { header: 'Nombre', field: 'sNombre', type: null, width: '200', align: 'left' },
    { header: 'Precio', field: 'nPrecio', type: null, width: '100', align: 'right' }
  ];
  /* #endregion */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tratamientos: Tratamiento[] },
    public dialogRef: MatDialogRef<DialogTratamientoChooseComponent>,
    private fb: FormBuilder
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
    this.form = this.fb.group({
      tratamientos: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.buildFormArray(this.data.tratamientos);
    this.dataSource = new MatTableDataSource(this.tratamientosArray.controls);
  }

  get tratamientosArray(): FormArray {
    return this.form.get('tratamientos') as FormArray;
  }

  private buildFormArray(data: Tratamiento[]): void {
    data.forEach(item => {
      this.tratamientosArray.push(this.fb.group({
        isCheck: [false],
        nIdTratamiento: item.nIdTratamiento,
        sNombre: item.sNombre,
        nPrecio: item.nPrecio
      }));
    });
  }

  apply(): void {
    const seleccionados = this.tratamientosArray.value.filter((item: any) => item.isCheck);
    this.dialogRef.close(seleccionados);
  }
}
