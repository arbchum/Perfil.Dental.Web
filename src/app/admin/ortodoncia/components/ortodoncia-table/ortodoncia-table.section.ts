import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetOrtodonciaDataDto, OrtodonciaDataDto } from 'src/app/admin/shared/interface/ortodoncia.interface';
import { OrtodonciaAddControlSection } from '../ortodoncia-add-control/ortodoncia-add-control.section';
import { DetOrtodonciaUI, OrtodonciaUI } from 'src/app/admin/shared/model';
import { BaseService } from 'src/app/common';

@Component({
  selector: 'section-ortodoncia-table',
  templateUrl: './ortodoncia-table.section.html',
  styleUrls: ['./ortodoncia-table.section.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrtodonciaTableSection {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendIdOrtodoncia: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendLookAtDetail: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendFormOrtodoncia: EventEmitter<OrtodonciaUI> = new EventEmitter<OrtodonciaUI>();
  @Input() set ortodoncias(value: OrtodonciaDataDto[] | null | undefined) {
    this.dataSource.data = value ?? [];
  }
  @Input() dataSourceDet: DetOrtodonciaDataDto[] = [];

  dataSource = new MatTableDataSource<OrtodonciaDataDto>([]);
  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 50];
  expandedRow: OrtodonciaDataDto | null;

  displayedColumnsDet: string[] = ['sNroControl', 'dFechaControl', 'none'];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '60', align: 'center' },
    { header: 'Paciente', field: 'sNomPaciente', type: null, width: '200', align: 'left' },
    { header: 'Controles hechos', field: 'nCantidadControles', type: null, width: '50', align: 'right' },
    { header: 'Estado', field: 'sEstado', type: null, width: '80', align: 'left' },
    { header: 'Fecha de registro', field: 'dFechaReg', type: 'date', width: '150', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '60', align: 'center' },
    { header: '', field: 'expand', type: 'expand', width: '30', align: 'center' },
  ];
  /* #endregion */

  constructor(
    private baseServ: BaseService,
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    if (this.dataSource) this.dataSource.filter = ''
  }

  openDetail(row: OrtodonciaDataDto): void {
    this.expandedRow = this.expandedRow === row ? null : row
  }

  addControl(row: OrtodonciaDataDto) {
    const data = {
      sNomPaciente: row.sNomPaciente,
      nNroControl: row.nCantidadControles + 1,
      dFechaMin: this.dataSourceDet[0].dFechaControl
    };
    this.baseServ.openDialog<DetOrtodonciaUI>(OrtodonciaAddControlSection, data)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          const vDetOrtodoncia: DetOrtodonciaUI[] = []
          vDetOrtodoncia.push(result)
          const vForm: OrtodonciaUI = { nIdOrtodoncia: row.nIdOrtodoncia, detOrtodoncia: vDetOrtodoncia }
          this.sendFormOrtodoncia.emit(vForm)
        }
      });
  }
}
