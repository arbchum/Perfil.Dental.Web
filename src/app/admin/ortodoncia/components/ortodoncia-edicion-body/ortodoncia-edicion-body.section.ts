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
    { header: 'Nro.', field: 'nNroSesion', type: 'nNroSesion', width: '60', align: 'center' },
    { header: 'Fecha', field: 'dFechaControl', type: 'dFechaControl', width: '60', align: 'center' },
    { header: 'Comentario', field: 'sComentario', type: null, width: '400', align: 'left' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '40', align: 'center' },
  ];
  /* #endregion */

  constructor(private baseServ: BaseService) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnInit(): void {
  }

  textControl(nNroSesion: number): string {
    return nNroSesion == 0 ? 'Instalación' : `Control\nNro. ${("00" + nNroSesion).slice(-2)}`;
  }

  newOrtodoncia(): void {
    const data = {
      sNomPaciente: this.sNomPaciente,
      nNroSesion: this.dataSource[0].nNroSesion,
      dFechaMin: this.getFecha(this.dataSource[0].nNroSesion)
    };

    this.openModalOrtodoncia(data);
  }

  updateOrtodoncia(row: DetOrtodonciaGetResponse): void {
    const vForm: DetOrtodonciaUI = {
      'nNroSesion': row.nNroSesion, 
      'dFechaControl': row.dFechaControl, 
      'sComentario': row.sComentario
    };

    const data = {
      sNomPaciente: this.sNomPaciente,
      nNroSesion: row.nNroSesion,
      dFechaMin: this.getFecha(row.nNroSesion - 1),
      dFechaMax: this.getFecha(row.nNroSesion + 1),
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

  getFecha(pNroSesion: number) {
    const detail = this.dataSource.find(item => item.nNroSesion == pNroSesion);
    return detail?.dFechaControl;
  }
}
