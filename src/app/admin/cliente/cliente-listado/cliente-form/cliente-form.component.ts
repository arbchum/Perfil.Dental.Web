import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  form: FormGroup;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    private fb: FormBuilder
  ) {
    this.title = 'CLIENTE NUEVO';
    this.form = this.fb.group({
      sApePaterno: [null, Validators.required],
      sApeMaterno: [null, Validators.required],
      sNombres: [null, Validators.required],
      sNroDocumento: [null, Validators.required],
      sSexo: [null, Validators.required],
      sCelular: [null],
      sTelefono: [null],
      dFechaNac: [null],
      sCorreo: [null],
    })
  }

  get sApePaternoCtrl(): FormControl { return this.form.get('sApePaterno') as FormControl }
  get sApeMaternoCtrl(): FormControl { return this.form.get('sApeMaterno') as FormControl }
  get sNombresCtrl(): FormControl { return this.form.get('sNombres') as FormControl }
  get sNroDocumentoCtrl(): FormControl { return this.form.get('sNroDocumento') as FormControl }
  get sSexoCtrl(): FormControl { return this.form.get('sSexo') as FormControl }

  get sApePaternoError(): unknown { return this.sApePaternoCtrl.hasError('required') ? 'campo requerido' : null }
  get sApeMaternoError(): unknown { return this.sApeMaternoCtrl.hasError('required') ? 'campo requerido' : null }
  get sNombresError(): unknown { return this.sNombresCtrl.hasError('required') ? 'campo requerido' : null }
  get sNroDocumentoError(): unknown { return this.sNroDocumentoCtrl.hasError('required') ? 'campo requerido' : null }
  get sSexoError(): unknown { return this.sSexoCtrl.hasError('required') ? 'campo requerido' : null }

  ngOnInit(): void {
    if (this.data.cliente) {
      this.form.patchValue(this.data.cliente);
    }
  }

  saveCliente(): void {
    this.dialogRef.close(this.form.value);
  }
}
