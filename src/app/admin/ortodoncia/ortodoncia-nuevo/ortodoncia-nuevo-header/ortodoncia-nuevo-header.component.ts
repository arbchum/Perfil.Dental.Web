import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteDto, ConfigAutocomplete } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-ortodoncia-nuevo-header',
  templateUrl: './ortodoncia-nuevo-header.component.html',
  styleUrls: ['./ortodoncia-nuevo-header.component.scss']
})
export class OrtodonciaNuevoHeaderComponent implements OnInit {
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
