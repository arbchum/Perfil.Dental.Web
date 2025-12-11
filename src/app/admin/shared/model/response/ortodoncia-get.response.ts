export interface OrtodonciaGetResponse {
  sCodigo: string;
  sNomPaciente: string;
  sNomEstado: string;
  dFechaReg: Date;
  dFechaMod: string;
  controles: DetOrtodonciaGetResponse[];
}

export interface DetOrtodonciaGetResponse {
  nNroControl: number;
  dFechaControl: Date;
  sComentario: string;
}