import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { ClienteHttp } from '../../shared/http';
import { Cliente, ClienteDto, Provincia } from '../../shared/interface';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.scss']
})
export class ClienteListadoComponent implements OnInit {
  clientes: ClienteDto[];
  provincias: Provincia[];

  constructor(
    private clienteHttp: ClienteHttp,
    private dialog: MatDialog,
    private alert: PerfildSweetAlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    forkJoin({
      resClientes: this.clienteHttp.getClienteSearch(),
      resProvincias: this.clienteHttp.getUbigeoAll()
    }).subscribe(({ resClientes, resProvincias }) => {
      this.clientes = resClientes;
      this.provincias = resProvincias;
    });
  }

  listarClientes(): void {
    this.clienteHttp.getClienteSearch().subscribe(
      res => {
        this.clientes = res;
      }
    );
  }

  operModalClienteForm(cliente?: Cliente): void {
    this.clienteHttp.getUbigeoAll().pipe(
      switchMap(resProvincias =>
        this.dialog.open(ClienteFormComponent, {
          width: '600px',
          disableClose: true,
          data: { 'cliente': cliente, 'provincias': resProvincias }
        }).afterClosed())
    ).subscribe((result: Cliente) => {
      if (result) {
        result.nIdCliente = cliente?.nIdCliente ?? 0;
        this.saveCliente(result);
      }
    });
  }

  getCliente(nId: number): void {
    this.clienteHttp.getClienteOne(nId).subscribe(
      res => {
        this.operModalClienteForm(res);
      }
    );
  }

  saveCliente(cliente: Cliente): void {
    this.clienteHttp.sendClienteCreateOrUpdate(cliente).subscribe(
      res => {
        if (res) {
          this.alert.showToast('success');
          this.listarClientes();
        }
        else this.alert.showMessage('error')
      }
    );
  }

  navigateHistorico(nIdCliente: number): void {
    this.router.navigate(['../historico', nIdCliente ?? 0], { relativeTo: this.activatedRoute });
  }
}
