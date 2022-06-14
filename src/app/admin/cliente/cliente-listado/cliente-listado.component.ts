import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { ClienteHttp } from '../../shared/http';
import { Cliente, ClienteDto } from '../../shared/interface';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.scss']
})
export class ClienteListadoComponent implements OnInit {
  clientes: ClienteDto[];

  constructor(
    private clienteHttp: ClienteHttp,
    private dialog: MatDialog,
    private alert: PerfildSweetAlertService
  ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(showMessage?: true): void {
    this.alert.showLoading();
    this.clienteHttp
      .getClienteSearch()
      //.pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        this.alert.closeLoading()
        this.clientes = res;
        if (showMessage)
          this.alert.showToast('success');
      });
  }

  operModalClienteForm(cliente?: Cliente): void {
    this.dialog.open(ClienteFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 'cliente': cliente }
    }).afterClosed()
      .subscribe((result: Cliente) => {
        if (result) {
          result.nIdCliente = cliente?.nIdCliente ?? 0;
          this.saveCliente(result);
        }
      });
  }

  getCliente(nId: number): void {
    this.alert.showLoading();
    this.clienteHttp
      .getClienteOne(nId)
      .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        this.operModalClienteForm(res);
      });
  }

  saveCliente(cliente: Cliente): void {
    this.alert.showLoading();
    this.clienteHttp
      .sendClienteCreateOrUpdate(cliente)
      .pipe(finalize(() => this.alert.closeLoading()))
      .subscribe(res => {
        if (res) {
          this.listarClientes(true);
        }
        else this.alert.showMessage('error')
      });
  }
}
