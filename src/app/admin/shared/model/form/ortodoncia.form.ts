export interface OrtodonciaUI {
  nIdOrtodoncia: number;
  nIdPaciente?: number;
  detOrtodoncia: DetOrtodonciaUI[];
}

export interface DetOrtodonciaUI {
  nNroControl: number;
  dFechaControl: Date;
  sComentario: string;
}