export interface Cliente {
  nIdCliente: number;
  sApePaterno: string;
  sApeMaterno: string;
  sNombres: string;
  sNroDocumento: string;
  sSexo: string;
  dFechaNac: string;
  sCelular: string;
  sTelefono: string;
  sCorreo: string;
}

export interface ClienteDto{
  nIdCliente: number;
  sCodigo: string;
  sNomCliente: string;
  sNroDocumento: string;
  sEdad: string;
  sCelular: string;
  sActivo: string;
}
