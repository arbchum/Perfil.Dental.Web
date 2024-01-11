import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { AtencionHttp, ClienteHttp } from '../../shared/http';

@Component({
  selector: 'app-cliente-historico-atencion',
  templateUrl: './cliente-historico-atencion.component.html',
  styleUrls: ['./cliente-historico-atencion.component.scss']
})
export class ClienteHistoricoAtencionComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[];
  paciente: string;

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código de atención', field: 'sCodigo', type: null, width: '60', align: 'center' },
    { header: 'Fecha de atención', field: 'sFechaReg', type: 'breakline', width: '120', align: 'left' },
    { header: 'Nota', field: 'sNota', type: null, width: '200', align: 'left' },
    { header: 'Tratamientos', field: 'sTratamientos', type: 'breakline', width: '250', align: 'left' },
  ];
  /* #endregion */

  constructor(
    private atencionHttp: AtencionHttp,
    private clienteHttp: ClienteHttp,
    private alert: PerfildSweetAlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnInit(): void {
    const pIdCliente = Number(this.route.snapshot.paramMap.get('nIdCliente'));
    this.getCliente(pIdCliente);
    this.getAtencionHistorical(pIdCliente);
  }

  getAtencionHistorical(nIdCliente: number) {
    this.atencionHttp.getAtencionHistorical(nIdCliente).subscribe(
      res => {
        this.dataSource = res;
      }
    );
  }

  getCliente(nIdCliente: number) {
    this.clienteHttp.getClienteOne(nIdCliente).subscribe(res => {
      this.paciente = `Historia clínica de\n\n${res.sNombres} ${res.sApePaterno} ${res.sApeMaterno}`;
    });
  }

  goListadoCliente(): void {
    this.router.navigateByUrl('/cliente/listado');
  }
}
