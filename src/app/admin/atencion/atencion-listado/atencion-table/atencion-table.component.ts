import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtencionDto } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-atencion-table',
  templateUrl: './atencion-table.component.html',
  styleUrls: ['./atencion-table.component.scss']
})
export class AtencionTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendIdAtencion: EventEmitter<number> = new EventEmitter<number>();
  @Input() atenciones: AtencionDto[] = [];
  dataSource: MatTableDataSource<AtencionDto>;
  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 50];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '50', align: 'center' },
    { header: 'Fecha y Hora de Registro', field: 'sFechaReg', type: null, width: '100', align: 'center' },
    { header: 'Paciente', field: 'sNomCliente', type: null, width: '200', align: 'left' },
    { header: 'Monto Total', field: 'nMonto', type: 'deci2', width: '100', align: 'right' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '60', align: 'center' },
  ];
  /* #endregion */

  constructor() {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atenciones'] && this.atenciones) {
      this.dataSource = new MatTableDataSource<AtencionDto>(this.atenciones);
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
