export interface AtencionGetResponse {
  sCodigo: string
  sNomPaciente: string;
  sNota: string
  nMonto: number
  dFechaReg: Date
  tratamientos: DetAtencionGetResponse[]
}

export interface DetAtencionGetResponse {
  nNro: number
  sNomTratamiento: string
  nCantidad: number
  nPrecio: number
}