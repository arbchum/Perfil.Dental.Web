import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tratamiento } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.scss']
})
export class TratamientoFormComponent implements OnInit {
  form: FormGroup;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tratamiento: Tratamiento },
    public dialogRef: MatDialogRef<TratamientoFormComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      sNombre: [null, Validators.required],
      nPrecio: [null, Validators.required],
    });
    this.title = 'TRATAMIENTO';
  }

  ngOnInit(): void {
    if (this.data.tratamiento) {
      this.form.patchValue(this.data.tratamiento);
      this.title += ' EDICIÓN';
    } else {
      this.title += ' NUEVO';
    }
  }

  get sNombreCtrl(): FormControl { return this.form.get('sNombre') as FormControl }
  get nPrecioCtrl(): FormControl { return this.form.get('nPrecio') as FormControl }

  get sNombreError(): unknown { return this.sNombreCtrl.hasError('required') ? 'campo requerido' : null }
  get nPrecioError(): unknown { return this.nPrecioCtrl.hasError('required') ? 'campo requerido' : null }


  saveTratamiento(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(ctrl => ctrl.markAsTouched());
    }
    this.dialogRef.close(this.form.value);
  }
}
