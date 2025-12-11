import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DetOrtodonciaGetResponse, DetOrtodonciaUI, OrtodonciaUI } from 'src/app/admin/shared/model';
import { BaseService } from 'src/app/common';
import { OrtodonciaAddControlSection } from '../ortodoncia-add-control/ortodoncia-add-control.section';

@Component({
  selector: 'section-ortodoncia-edicion-body',
  templateUrl: './ortodoncia-edicion-body.section.html',
  styleUrls: ['./ortodoncia-edicion-body.section.scss']
})
export class OrtodonciaEdicionBodySection implements OnInit {
  @Output() sendFormDetOrtodoncia: EventEmitter<DetOrtodonciaUI> = new EventEmitter<DetOrtodonciaUI>();
  @Input() sNomPaciente: string;
  @Input() dataSource: DetOrtodonciaGetResponse[] = [];
  displayedColumns: string[] = [];
  verMas: boolean;

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Nro.', field: 'sNroControl', type: null, width: '60', align: 'center' },
    { header: 'Fecha', field: 'dFechaControl', type: 'dFechaControl', width: '60', align: 'center' },
    { header: 'Comentario', field: 'sComentario', type: 'sComentario', width: '400', align: 'left' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '50', align: 'center' },
  ];
  /* #endregion */

  constructor(private baseServ: BaseService) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnInit(): void {
  }

  newOrtodoncia(): void {
    const data = {
      sNomPaciente: this.sNomPaciente,
      nNroControl: this.dataSource[0].nNroControl,
      dFechaMin: this.getFecha(this.dataSource[0].nNroControl)
    };

    this.openModalOrtodoncia(data);
  }

  updateOrtodoncia(row: DetOrtodonciaGetResponse): void {
    const vForm: DetOrtodonciaUI = {
      'nNroControl': row.nNroControl, 
      'dFechaControl': row.dFechaControl, 
      'sComentario': row.sComentario
    };

    const data = {
      sNomPaciente: this.sNomPaciente,
      nNroControl: row.nNroControl,
      dFechaMin: this.getFecha(row.nNroControl - 1),
      dFechaMax: this.getFecha(row.nNroControl + 1),
      formData: vForm
    };

    this.openModalOrtodoncia(data);
  }

  openModalOrtodoncia(data: unknown): void {
    this.baseServ.openDialog<DetOrtodonciaUI>(OrtodonciaAddControlSection, data)
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.sendFormDetOrtodoncia.emit(result);
      });
  }

  getFecha(nNroControl: number) {
    const detail = this.dataSource.find(item => item.nNroControl == nNroControl);
    return detail?.dFechaControl;
  }
}
