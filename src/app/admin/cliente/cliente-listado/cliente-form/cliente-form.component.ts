import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteHttp } from 'src/app/admin/shared/http';
import { Cliente, Distrito, Provincia } from 'src/app/admin/shared/interface';
import { PerfildSweetAlertService } from 'src/app/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  form: FormGroup;
  distritos: Distrito[];
  title: string;
  labelDocumento: string;
  minDate: Date;
  maxDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente, provincias: Provincia[] },
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    private fb: FormBuilder,
    private clienteHttp: ClienteHttp,
    private alert: PerfildSweetAlertService,
    private router: Router,
  ) {
    this.initForm();
    this.labelDocumento = 'Número de documento';
  }
  initForm(): void {
    this.form = this.fb.group({
      sApePaterno: [null, Validators.required],
      sApeMaterno: [null, Validators.required],
      sNombres: [null, Validators.required],
      bMayor: [1, Validators.required],
      sNroDocumento: [{ value: null, disabled: this.data.cliente }, Validators.required],
      sSexo: [null, Validators.required],
      sCelular: [null],
      sTelefono: [null],
      nIdProvincia: [null, Validators.required],
      nIdDistrito: [null, Validators.required],
      sDireccion: [null],
      dFechaNac: [null, Validators.required],
      sCorreo: [null],
    });
    this.form.disable({ emitEvent: false });
  }

  get sApePaternoCtrl(): FormControl { return this.form.get('sApePaterno') as FormControl }
  get sApeMaternoCtrl(): FormControl { return this.form.get('sApeMaterno') as FormControl }
  get sNombresCtrl(): FormControl { return this.form.get('sNombres') as FormControl }
  get sNroDocumentoCtrl(): FormControl { return this.form.get('sNroDocumento') as FormControl }
  get sSexoCtrl(): FormControl { return this.form.get('sSexo') as FormControl }
  get nIdProvinciaCtrl(): FormControl { return this.form.get('nIdProvincia') as FormControl }
  get nIdDistritoCtrl(): FormControl { return this.form.get('nIdDistrito') as FormControl }
  get dFechaNacCtrl(): FormControl { return this.form.get('dFechaNac') as FormControl }
  get bMenorCtrl(): FormControl { return this.form.get('bMayor') as FormControl }

  ngOnInit(): void {
    this.changeProvincia();
    this.changeEtapa();
    this.nIdProvinciaCtrl.setValue(153);
    this.title = 'PACIENTE';
    if (this.data.cliente) {
      this.form.enable();
      this.form.patchValue(this.data.cliente);
      this.sNroDocumentoCtrl.disable();
      this.title += ' EDICIÓN';
    } else {
      this.changeNroDocumento();
      this.sNroDocumentoCtrl.enable({ emitEvent: false });
      this.title += ' NUEVO';
    }
  }

  changeNroDocumento(): void {
    this.sNroDocumentoCtrl.valueChanges.subscribe((value: string) => {
      if ([8, 10].includes(value?.length))
        this.clienteHttp.getClienteByNroDocumento(value).subscribe(
          res => {
            if (res) {
              this.alert.ShowConfirmacion('El paciente está registrado\n¿desea registrarle una atención?')
                .then((result: any) => {
                  if (result?.isConfirmed) {
                    this.dialogRef.close()
                    this.goAtencionForm(res.nIdCliente)
                  } else
                    this.sNroDocumentoCtrl.reset()
                });
            }
            else {
              this.form.enable({ emitEvent: false });
              this.form.markAsUntouched()
            }
          }
        )
    });
  }

  changeProvincia(): void {
    this.nIdProvinciaCtrl.valueChanges.subscribe(value => {
      this.distritos = this.data.provincias.find(obj => obj.nIdUbigeo == value)?.distritos ?? [];
    });
  }

  changeEtapa(): void {
    this.bMenorCtrl.valueChanges.subscribe(value => {
      this.labelDocumento = `Número de documento${value == 1 ? '' : ' del padre'}`;
    });
  }

  saveCliente(): void {
    if (this.form.invalid)
      return this.form.markAllAsTouched();
    this.dialogRef.close(this.form.getRawValue());
  }

  goAtencionForm(idCliente: number): void {
    this.router.navigate(['/atencion/nuevo'], { state: { idCliente: idCliente } });
  }

  get sApePaternoError(): unknown { return this.sApePaternoCtrl.hasError('required') ? 'campo requerido' : null }
  get sApeMaternoError(): unknown { return this.sApeMaternoCtrl.hasError('required') ? 'campo requerido' : null }
  get sNombresError(): unknown { return this.sNombresCtrl.hasError('required') ? 'campo requerido' : null }
  get sNroDocumentoError(): unknown { return this.sNroDocumentoCtrl.hasError('required') ? 'campo requerido' : null }
  get sSexoError(): unknown { return this.sSexoCtrl.hasError('required') ? 'campo requerido' : null }
  get nIdDistritoError(): unknown { return this.nIdDistritoCtrl.hasError('required') ? 'campo requerido' : null }
  get dFechaNacError(): unknown { return this.dFechaNacCtrl.hasError('required') ? 'campo requerido' : null }
}
