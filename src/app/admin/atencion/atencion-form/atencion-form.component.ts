import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, startWith } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { DialogTratamientoChooseComponent } from '../../shared/components/dialog-tratamiento-choose/dialog-tratamiento-choose.component';
import { AtencionHttp, ClienteHttp, TratamientoHttp } from '../../shared/http';
import { ClienteDto, Tratamiento } from '../../shared/interface';

@Component({
  selector: 'app-atencion-form',
  templateUrl: './atencion-form.component.html',
  styleUrls: ['./atencion-form.component.scss']
})
export class AtencionFormComponent implements OnInit {
  dataSource: MatTableDataSource<AbstractControl> = new MatTableDataSource();
  displayedColumns: string[] = [];
  form: FormGroup;
  clientes: ClienteDto[] = [];
  filteredClientes: ClienteDto[];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Nombre', field: 'sNombre', type: null, width: '350', align: 'left' },
    { header: 'Cantidad', field: 'nCantidad', type: 'nCantidad', width: '50', align: 'center' },
    { header: 'Precio', field: 'nPrecio', type: null, width: '50', align: 'right' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '50', align: 'center' }
  ];
  /* #endregion */

  constructor(
    private fb: FormBuilder,
    private clienteHttp: ClienteHttp,
    private tratamientoHttp: TratamientoHttp,
    private atencionHttp: AtencionHttp,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alert: PerfildSweetAlertService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
    this.form = this.fb.group({
      nIdCliente: [null, Validators.required],
      detAtencion: this.fb.array([])
    });
  }

  ngOnInit() {
    this.listarClientes();
    this.sNomClienteCtrl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.clientes.slice()))
    ).subscribe(res => this.filteredClientes = res);
  }

  get isEmpty(): boolean { return this.dataSource?.data?.length == 0 }
  get sNomClienteCtrl(): FormControl { return this.form.get('nIdCliente') as FormControl; }
  get detAtencionArray(): FormArray { return this.form.get('detAtencion') as FormArray; }

  get sNomClienteError(): unknown { return this.sNomClienteCtrl.hasError('required') ? 'campo requerido' : null }

  listarClientes(): void {
    this.alert.showLoading();
    this.clienteHttp
      .getClienteSearch()
      .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        this.clientes = res;
      });
  }

  displayFn(nIdCliente: number): string {
    const cliente = this.clientes.find(item => item.nIdCliente == nIdCliente);
    return cliente ? `${cliente.sNroDocumento} - ${cliente.sNomCliente}` : '';
  }

  private _filter(name: string): ClienteDto[] {
    const filterValue = name.toLowerCase();

    return this.clientes.filter(cliente => cliente.sNomCliente.toLowerCase().includes(filterValue) || cliente.sNroDocumento.includes(filterValue));
  }

  goAtencionListado(): void {
    this.router.navigateByUrl('/atencion/atencion-listado');
  }

  chooseTratamiento(tratamientos: Tratamiento[]): void {
    this.dialog.open(DialogTratamientoChooseComponent, {
      width: '600px',
      data: { 'tratamientos': tratamientos }
    }).afterClosed()
      .subscribe((result: Tratamiento[]) => {
        if (result) {
          result.forEach(item => this.addRow(item));
          this.dataSource = new MatTableDataSource(this.detAtencionArray.controls);
        }
      });
  }

  private addRow(tratamiento: Tratamiento): void {
    this.detAtencionArray.push(
      this.fb.group({
        nIdTratamiento: tratamiento.nIdTratamiento,
        sNombre: tratamiento.sNombre,
        nCantidad: 1,
        nPrecio: tratamiento.nPrecio
      }));
  }

  getTratamientos(): void {
    this.alert.showLoading();
    this.tratamientoHttp
      .getTratamientoSearch()
      .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => this.chooseTratamiento(res));
  }

  quitTratamiento(index: number): void {
    this.detAtencionArray.removeAt(index);
    this.dataSource = new MatTableDataSource(this.detAtencionArray.controls);
  }

  saveAtencion(): void {
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => { control.markAllAsTouched() })
    }
    if(this.isEmpty){
      this.alert.showMessage('warning', 'Seleccione al menos un tratamiento');
      return;
    }
    this.alert.showLoading();
    this.atencionHttp
      .sendAtencionCreate(this.form.value)
      // .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        this.alert.closeLoading()
        if (res) {
          this.alert.showToast('success');
          this.goAtencionListado();
        }
        else this.alert.showMessage('error')
      });
  }
}
