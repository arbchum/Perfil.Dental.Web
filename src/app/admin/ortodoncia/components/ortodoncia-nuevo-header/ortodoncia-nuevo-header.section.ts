import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClienteDto, ConfigAutocomplete } from 'src/app/admin/shared/interface';

@Component({
  selector: 'section-ortodoncia-nuevo-header',
  templateUrl: './ortodoncia-nuevo-header.section.html',
  styleUrls: ['./ortodoncia-nuevo-header.section.scss']
})
export class OrtodonciaNuevoHeaderSection implements OnInit {
  @Output() sendIdPaciente: EventEmitter<number> = new EventEmitter<number>();
  @Input() form: FormGroup;
  @Input() clientes: ClienteDto[];
  configCliente: ConfigAutocomplete = { idField: 'nIdCliente', textField: 'sNomCliente', label: 'Paciente' };
  //sNotaMaxLength: number = 500;

  constructor(
  ) { }

  // get dFechaInstalacionCtrl(): FormControl { return this.form.get('dFechaInstalacion') as FormControl }
  // get sNotaCtrl(): FormControl { return this.form.get('sNota') as FormControl }

  // get dFechaIngresoInstalacionError(): unknown { return this.dFechaInstalacionCtrl.hasError('required') ? 'campo requerido' : null }

  ngOnInit(): void {
  }
}
