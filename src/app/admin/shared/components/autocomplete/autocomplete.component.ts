import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { map, startWith } from 'rxjs/operators';
import { ConfigAutocomplete } from '../../interface';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Output() sendValue: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any[] = [];
  @Input() placeholder = 'Seleccione';
  @Input() apariencia: MatFormFieldAppearance;
  @Input() showMessage = true;
  @Input() configuracion: ConfigAutocomplete;
  // @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  // onChange: (value: any) => void = () => { };
  // onTouched: () => void = () => { };
  ctrl = new FormControl('');
  dataFiltered: any[];
  hideButtonCancel = true;

  constructor(
    @Self() private ngControl: NgControl
  ) {
    if (this.ngControl)
      ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.ctrl = this.ngControl.control as FormControl;
    const validateAutocomplete = dataAutocompleteValidator(this.data, this.configuracion.idField);
    const validators = this.ctrl.validator
      ? [this.ctrl.validator, validateAutocomplete] : validateAutocomplete;
    this.ctrl.setValidators(validators);
    this.filterData();
  }

  get sError(): any {
    if (this.ctrl.touched || this.ctrl.dirty) {
      switch (true) {
        case this.ctrl.hasError('required'):
          return 'campo requerido';
        case this.ctrl.hasError('dataAutocompleteValidator'):
          return this.ctrl.errors?.['dataAutocompleteValidator'];
        default: return '';
      }
    }
  }

  writeValue(value: any): void {
    //value && this.ctrl.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    //this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    //this.onTouched = onTouched;
  }

  filterData(): void {
    this.ctrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' || value == null ? value : this.getCadena(Number(value))),
      map(cadena => cadena ? this._filter(cadena) : this.data.slice())
    ).subscribe(res => this.dataFiltered = res);
  }

  private _filter(cadena: string): any[] {
    const filterValue = cadena.toLowerCase();
    return this.data.filter(item => item[this.configuracion.textField].toLowerCase().includes(filterValue));
  }

  displayFn(id: number): string {
    this.hideButtonCancel = false;
    return this.getCadena(id);
  }

  getCadena(id: number): string {
    const item = this.data.find(item => item[this.configuracion.idField] == id);
    return item ? item[this.configuracion.textField] : null;
  }

  selectedOption(): void{
    this.sendValue.emit(this.ctrl.value);
  }

  clean(): void {
    this.hideButtonCancel = true;
    this.ctrl.reset();
  }
}

export function dataAutocompleteValidator(data: any[], key: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as String;
    if (value == null) return null;
    const encontrado = data?.some(item => item[key] == value);
    return encontrado ? null : { dataAutocompleteValidator: 'nombre no reconocido' };
  }
}
