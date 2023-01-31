import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetOrtodonciaDto, OrtodonciaDto } from 'src/app/admin/shared/interface/ortodoncia.interface';

@Component({
  selector: 'app-ortodoncia-table',
  templateUrl: './ortodoncia-table.component.html',
  styleUrls: ['./ortodoncia-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrtodonciaTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendIdAtencion: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendOrtodoncia: EventEmitter<OrtodonciaDto> = new EventEmitter<OrtodonciaDto>();
  @Input() ortodoncias: OrtodonciaDto[] = [];
  @Input() dataSourceDet: DetOrtodonciaDto[] = [];

  dataSource: MatTableDataSource<OrtodonciaDto>;
  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 50];
  expandedRow: OrtodonciaDto | null;

  displayedColumnsDet: string[] = ['sControl','sFechaControl','none'];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '50', align: 'center' },
    { header: 'Paciente', field: 'sNomPaciente', type: null, width: '200', align: 'left' },
    { header: 'Controles atendidos', field: 'nCantidadSesiones', type: null, width: '50', align: 'right' },
    { header: 'Instalación', field: 'sFechaInstalacion', type: null, width: '100', align: 'center' },
    { header: 'Término', field: 'sFechaTermino', type: null, width: '100', align: 'center' },
    { header: 'Fecha de registro', field: 'sFechaReg', type: null, width: '100', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '60', align: 'center' },
    { header: '', field: 'expand', type: 'expand', width: '30', align: 'center' },
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

  get isDetEmpty(): boolean {
    return this.dataSourceDet && this.dataSourceDet.length === 0;
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
