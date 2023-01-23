export interface OrtodonciaUI {
  nIdPaciente: number;
  dFechaInstalacion: Date;
  detOrtodoncia: DetOrtodonciaUI[];
}

export interface DetOrtodonciaUI {
  sDescripcion: string;
  dFechaControl: Date;
  dFechaMin: Date;
}