import { Tratamiento } from "../../interface";

export interface AtencionUI {
  nIdAtencion: number;
  sNota: string;
  nIdCliente: number;
  detAtencion: DetAtencionUI[];
}

export interface DetAtencionUI {
  nIdTratamiento: number;
  nCantidad: number;
  nPrecio: number;
  lstTratamiento: Tratamiento[];
}