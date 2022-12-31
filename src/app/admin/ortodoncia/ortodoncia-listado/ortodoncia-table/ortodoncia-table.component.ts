import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrtodonciaDto } from 'src/app/admin/shared/interface/ortodoncia.interface';

@Component({
  selector: 'app-ortodoncia-table',
  templateUrl: './ortodoncia-table.component.html',
  styleUrls: ['./ortodoncia-table.component.scss']
})
export class OrtodonciaTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendIdAtencion: EventEmitter<number> = new EventEmitter<number>();
  @Input() ortodoncias: OrtodonciaDto[] = [];

  dataSource: MatTableDataSource<OrtodonciaDto>;
  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 50];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '50', align: 'center' },
    { header: 'Paciente', field: 'sNomPaciente', type: null, width: '200', align: 'left' },
    { header: 'Nro. de ajustes', field: 'nCantidadSesiones', type: null, width: '80', align: 'right' },
    { header: 'Ingreso', field: 'sFechaIngreso', type: null, width: '100', align: 'center' },
    { header: 'Término', field: 'sFechaTermino', type: null, width: '100', align: 'center' },
    { header: 'Fecha de registro', field: 'sFechaReg', type: null, width: '100', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '60', align: 'center' },
  ];
  /* #endregion */

  constructor() {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ortodoncias'] && this.ortodoncias) {
      this.dataSource = new MatTableDataSource<OrtodonciaDto>(this.ortodoncias);
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
