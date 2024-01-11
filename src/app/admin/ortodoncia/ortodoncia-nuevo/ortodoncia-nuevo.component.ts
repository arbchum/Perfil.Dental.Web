import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfildSweetAlertService } from 'src/app/common';
import { ClienteHttp, OrtodonciaHttp } from '../../shared/http';
import { ClienteDto, OrtodonciaDataDto } from '../../shared/interface';
import { OrtodonciaRequest, OrtodonciaUI } from '../../shared/model';

@Component({
  selector: 'app-ortodoncia-nuevo',
  templateUrl: './ortodoncia-nuevo.component.html',
  styleUrls: ['./ortodoncia-nuevo.component.scss']
})
export class OrtodonciaNuevoComponent implements OnInit {
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

  ngOnInit(): void {
    this.getClientes();
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
