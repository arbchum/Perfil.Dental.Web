export interface OrtodonciaDataDto {
  nIdOrtodoncia: number
  sCodigo: string;
  nIdPaciente: number;
  sNomPaciente: string;
  nCantidadControles: number; 
  sEstado: string;
  dFechaReg: Date;
}

export interface DetOrtodonciaDataDto{
  sNroControl: string;
  dFechaControl: Date;
  sComentario: string;
}