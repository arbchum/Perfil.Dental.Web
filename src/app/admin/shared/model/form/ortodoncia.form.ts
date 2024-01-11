export interface OrtodonciaUI {
  nIdPaciente: number;
  detOrtodoncia: DetOrtodonciaUI[];
}

export interface DetOrtodonciaUI {
  nNroSesion: number;
  sComentario: string;
  dFechaControl: Date;
  dFechaMin: Date;
}