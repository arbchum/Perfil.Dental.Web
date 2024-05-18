import { DetOrtodonciaUI, OrtodonciaUI } from "..";
import { EOrtodonciaEstado } from "../../enum";


export class OrtodonciaRequest {
  nIdPaciente: number;
  nIdEstado: EOrtodonciaEstado;
  detOrtodoncia: DetOrtodonciaRequest[];
  constructor(form: OrtodonciaUI, pIdEstado: EOrtodonciaEstado = EOrtodonciaEstado.Instalado) {
    this.nIdPaciente = form.nIdPaciente;
    this.nIdEstado = pIdEstado;
    this.detOrtodoncia = form.detOrtodoncia.map((item) => new DetOrtodonciaRequest(item));
  }
}

export class DetOrtodonciaRequest {
  nIdPaciente : number;
  nNroSesion: number;
  sComentario: string;
  dFechaControl: Date;
  constructor(form: DetOrtodonciaUI, pIdPaciente: number = 0) {
    this.nIdPaciente = pIdPaciente;
    this.nNroSesion = form.nNroSesion;
    this.sComentario = form.sComentario;
    this.dFechaControl = form.dFechaControl;
  }
}