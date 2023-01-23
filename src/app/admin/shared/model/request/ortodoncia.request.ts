import { DetOrtodonciaUI, OrtodonciaUI } from "..";

export class OrtodonciaRequest {
  nIdPaciente: number;
  dFechaInstalacion: Date;
  detOrtodoncia: DetOrtodonciaRequest[];
  constructor(form: OrtodonciaUI) {
    this.nIdPaciente = form.nIdPaciente;
    this.dFechaInstalacion = form.dFechaInstalacion;
    this.detOrtodoncia = form.detOrtodoncia.map((item) => new DetOrtodonciaRequest(item));
  }
}

export class DetOrtodonciaRequest {
  sDescripcion: string;
  dFechaControl: Date;
  constructor(form: DetOrtodonciaUI) {
    this.sDescripcion = form.sDescripcion;
    this.dFechaControl = form.dFechaControl;
  }
}