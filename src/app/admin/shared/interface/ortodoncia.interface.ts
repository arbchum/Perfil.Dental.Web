export interface OrtodonciaDto {
  nIdOrtodoncia: number;
  sCodigo: string;
  nIdPaciente: number;
  sNomPaciente: string;
  sFechaInstalacion: string;
  sFechaTermino: string;
  nCantidadSesiones: number;
  sFechaReg: string;
}

export interface DetOrtodonciaDto{
  sControl: number;
  sFechaControl: string;
  sDescripcion: string;
}