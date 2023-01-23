import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteDto, ConfigAutocomplete } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-ortodoncia-nuevo-header',
  templateUrl: './ortodoncia-nuevo-header.component.html',
  styleUrls: ['./ortodoncia-nuevo-header.component.scss']
})
export class OrtodonciaNuevoHeaderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() clientes: ClienteDto[];
  configuracionCliente: ConfigAutocomplete = { idField: 'nIdCliente', textField: 'sNomCliente', label: 'Cliente' };

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
