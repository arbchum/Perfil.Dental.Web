import { DetOrtodonciaUI, OrtodonciaUI } from "..";
import { EOrtodonciaEstado } from "../../enum";


export class OrtodonciaRequest {
  nIdOrtodoncia: number
  nIdPaciente: number
  nIdEstado: EOrtodonciaEstado
  detOrtodoncia: DetOrtodonciaRequest[]
  constructor(form: OrtodonciaUI, pIdEstado?: EOrtodonciaEstado) {
    this.nIdOrtodoncia = form.nIdOrtodoncia
    this.nIdPaciente = form.nIdPaciente ?? 0
    this.nIdEstado = pIdEstado ?? 0
    this.detOrtodoncia = form.detOrtodoncia.map((item) => new DetOrtodonciaRequest(item))
  }
}

export class DetOrtodonciaRequest {
  nIdOrtodoncia: number;
  nNroControl: number;
  sComentario: string;
  dFechaControl: Date;
  constructor(form: DetOrtodonciaUI, pIdOrtodoncia: number = 0) {
    this.nIdOrtodoncia = pIdOrtodoncia;
    this.nNroControl = form.nNroControl;
    this.sComentario = form.sComentario;
    this.dFechaControl = form.dFechaControl;
  }
}