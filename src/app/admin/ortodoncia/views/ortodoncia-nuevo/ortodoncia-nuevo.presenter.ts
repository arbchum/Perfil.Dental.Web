import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteHttp, OrtodonciaHttp } from 'src/app/admin/shared/http';
import { ClienteDto, OrtodonciaDataDto } from 'src/app/admin/shared/interface';
import { OrtodonciaRequest, OrtodonciaUI } from 'src/app/admin/shared/model';
import { PerfildSweetAlertService } from 'src/app/common';

@Injectable()
export class OrtodonciaNuevoPresenter {
  form: FormGroup;
  clientes: ClienteDto[];
  ItemOrtodoncia: OrtodonciaDataDto | undefined;

  constructor(
    private fb: FormBuilder,
    private clienteHttp: ClienteHttp,
    private ortodonciaHttp: OrtodonciaHttp,
    private router: Router,
    private alert: PerfildSweetAlertService
  ) {
    this.form = this.fb.group({
      nIdPaciente: [null, Validators.required],
      detOrtodoncia: this.fb.array([])
    })
  }

  get formBody(): FormArray { return this.form.get('detOrtodoncia') as FormArray }

  getClientes(): void {
    this.clienteHttp.getClienteSearch().subscribe(res => {
      if (res) {
        this.clientes = res;
      }
    });
  }

  goOrtodonciaListado(): void {
    this.router.navigateByUrl('/ortodoncia/listado');
  }

  saveOrtodoncia(): void {
    if (this.ItemOrtodoncia)
      return this.alert.showMessage('info', `El paciente ${this.ItemOrtodoncia?.sNomPaciente} ya está registrado`);
    if (this.form.invalid)
      return Object.values(this.form.controls).forEach(control => { control.markAllAsTouched() });

    const request = new OrtodonciaRequest(this.form.getRawValue() as OrtodonciaUI);

    this.ortodonciaHttp.createOrtodoncia(request).subscribe(
      res => {
        if (res) {
          this.alert.showToast('success');
          this.goOrtodonciaListado();
        }
        else this.alert.showMessage('error')
      }
    );
  }

  validatePacienteOrtodoncia(pIdPaciente: number): void {
    this.ortodonciaHttp.getOrtodonciaSearch().subscribe(res => {
      this.ItemOrtodoncia = res.find(item => item.nIdPaciente == pIdPaciente);
      if (this.ItemOrtodoncia) {
        this.alert.showMessage('info', `El paciente ${this.ItemOrtodoncia?.sNomPaciente} ya está registrado`);
      }
    });
  }
}
