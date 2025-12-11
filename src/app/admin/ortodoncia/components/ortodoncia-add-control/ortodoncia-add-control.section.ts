import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DetOrtodonciaUI } from 'src/app/admin/shared/model';

@Component({
  selector: 'section-ortodoncia-add-control',
  templateUrl: './ortodoncia-add-control.section.html',
  styleUrls: ['./ortodoncia-add-control.section.scss']
})
export class OrtodonciaAddControlSection implements OnInit {
  form: FormGroup;
  title: string;
  sComentarioMaxLength: number = 1000;
  fechaMin: Date | null;
  fechaMax: Date | null;
  nNroControl: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      sNomPaciente: string,
      nNroControl: number,
      dFechaMin: Date,
      dFechaMax: Date,
      formData: DetOrtodonciaUI
    },
    public dialogRef: MatDialogRef<OrtodonciaAddControlSection>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.nNroControl = this.data.nNroControl;
    this.title = this.nNroControl > 0 ?  `Control Nro. ${("00" + (this.nNroControl)).slice(-2)}` : 'Instalación';
    this.fechaMin = this.data.dFechaMin ? moment(this.data.dFechaMin).add(1, 'd').toDate() : null;
    this.fechaMax = this.data.dFechaMax ? moment(this.data.dFechaMax).add(-1, 'd').toDate() : null;
    this.initForm();
    if(this.data.formData)
      this.setForm(this.data.formData);
  }

  initForm(): void {
    this.form = this.fb.group({
      nNroControl: [this.nNroControl, Validators.required],
      dFechaControl: [null, Validators.required],
      sComentario: [null, Validators.required]
    })
  }

  setForm(formData: DetOrtodonciaUI): void {
    this.form.patchValue({ 'dFechaControl': formData.dFechaControl, 'sComentario': formData.sComentario })
  }

  get dFechaControlCtrl(): FormControl { return this.form.get('dFechaControl') as FormControl }
  get sComentarioCtrl(): FormControl { return this.form.get('sComentario') as FormControl }

  get dFechaControlError(): unknown { return this.dFechaControlCtrl.hasError('required') ? 'campo requerido' : null }
  get sComentarioError(): unknown { return this.sComentarioCtrl.hasError('required') ? 'campo requerido' : null }


  saveControl(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    const vNuevoForm: DetOrtodonciaUI = this.form.value;
    this.dialogRef.close(vNuevoForm);
  }
}
