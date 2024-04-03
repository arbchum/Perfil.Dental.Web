export interface OrtodonciaGetResponse {
  sCodigo: string;
  sNomPaciente: string;
  nIdEstado: string;
  dFechaReg: Date;
  dFechaMod: string;
  sesiones: DetOrtodonciaGetResponse[];
}

export interface DetOrtodonciaGetResponse {
  nNroSesion: number;
  dFechaControl: Date;
  sComentario: string;
}