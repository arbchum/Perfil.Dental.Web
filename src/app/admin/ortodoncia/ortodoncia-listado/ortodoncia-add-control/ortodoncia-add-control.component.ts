import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DetOrtodonciaDataDto, OrtodonciaDataDto } from 'src/app/admin/shared/interface';
import { DetOrtodonciaRequest, OrtodonciaUI } from 'src/app/admin/shared/model';

@Component({
  selector: 'app-ortodoncia-add-control',
  templateUrl: './ortodoncia-add-control.component.html',
  styleUrls: ['./ortodoncia-add-control.component.scss']
})
export class OrtodonciaAddControlComponent implements OnInit {
  form: FormGroup;
  title: string;
  sDescrpcionMaxLength: number = 500;
  fechaMin: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ortodoncia: OrtodonciaDataDto, lastDetOrtodoncia: DetOrtodonciaDataDto },
    public dialogRef: MatDialogRef<OrtodonciaAddControlComponent>,
    private fb: FormBuilder
  ) {
    this.title = `Registro de Control Nro. ${("00" + (this.data.ortodoncia.nCantidadControles + 1)).slice(-2)}`;
  }

  ngOnInit(): void {
    const vFechaSeleccionada = this.data.lastDetOrtodoncia.sFechaControl;
    this.fechaMin = moment(vFechaSeleccionada, 'DD/MM/YYYY').add(1, 'days').toDate();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      dFechaControl: ['', Validators.required],
      sComentario: [null, Validators.required]
    })
  }

  get dFechaControlCtrl(): FormControl { return this.form.get('dFechaControl') as FormControl }
  get sDescripcionCtrl(): FormControl { return this.form.get('sComentario') as FormControl }

  get dFechaControlError(): unknown { return this.dFechaControlCtrl.hasError('required') ? 'campo requerido' : null }
  get sDescripcionError(): unknown { return this.sDescripcionCtrl.hasError('required') ? 'campo requerido' : null }


  saveControl(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    const vNuevoForm: OrtodonciaUI = {
      nIdPaciente: this.data.ortodoncia.nIdPaciente,
      detOrtodoncia: this.form.value
    }
    // const vRequest = new DetOrtodonciaRequest(this.form.value, this.data.ortodoncia.nIdPaciente);
    this.dialogRef.close(vNuevoForm);
  }
}
