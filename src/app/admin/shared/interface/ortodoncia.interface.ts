export interface OrtodonciaDataDto {
  sCodigo: string;
  nIdPaciente: number;
  sNomPaciente: string;
  nCantidadControles: number; 
  sEstado: string;
  sFechaReg: string;
}

export interface DetOrtodonciaDataDto{
  sControl: string;
  dFechaControl: Date;
  sComentario: string;
}