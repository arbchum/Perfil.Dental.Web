import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteDto } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.scss']
})
export class ClienteTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendIdCliente: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendIdHistorico: EventEmitter<number> = new EventEmitter<number>();
  @Input() clientes: ClienteDto[] = [];
  dataSource: MatTableDataSource<ClienteDto>;
  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 50];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '50', align: 'center' },
    { header: 'Nombre Completo', field: 'sNomCliente', type: null, width: '180', align: 'left' },
    { header: 'Documento', field: 'sNroDocumento', type: null, width: '70', align: 'center' },
    { header: 'Edad', field: 'sEdad', type: null, width: '130', align: 'left' },
    { header: 'Fecha de registro', field: 'sFechaReg', type: null, width: '130', align: 'center' },
    { header: 'Estado', field: 'sActivo', type: null, width: '60', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '50', align: 'center' },
  ];
  /* #endregion */

  constructor() {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientes'] && this.clientes) {
      this.dataSource = new MatTableDataSource<ClienteDto>(this.clientes);
      this.dataSource.paginator = this.paginator;
    }
  }

  get isEmpty(): boolean {
    return this.dataSource && this.dataSource.filteredData.length === 0;
  }

  /* #region  Método de filtración del listado */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* #endregion */

  fnClean(): void {
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
  }
}
