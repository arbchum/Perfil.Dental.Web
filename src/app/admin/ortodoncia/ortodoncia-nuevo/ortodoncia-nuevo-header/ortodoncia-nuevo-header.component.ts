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
  @Input() estaRegistrado: boolean;
  configuracionCliente: ConfigAutocomplete = { idField: 'nIdCliente', textField: 'sNomCliente', label: 'Paciente' };

  constructor(
  ) { }

  //get nIdPacienteCtrl(): FormControl { return this.form.get('nIdPaciente') as FormControl }
  get dFechaInstalacionCtrl(): FormControl { return this.form.get('dFechaInstalacion') as FormControl }

  get dFechaIngresoInstalacionError(): unknown { return this.dFechaInstalacionCtrl.hasError('required') ? 'campo requerido' : null }

  ngOnInit(): void {
  }
}
