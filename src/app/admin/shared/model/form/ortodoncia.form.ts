export interface OrtodonciaUI {
  nIdPaciente: number;
  detOrtodoncia: DetOrtodonciaUI[];
}

export interface DetOrtodonciaUI {
  nNroSesion: number;
  dFechaControl: Date;
  sComentario: string;
}