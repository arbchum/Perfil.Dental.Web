import { Tratamiento } from "./tratamiento.interface";

export interface AtencionDto {

}

export interface Atencion {
  nIdAtencion: number;
  sObservacion: number;
  nIdCliente: number;
  nMonto: number;
  detAtencion: DetAtencion[];
}

export interface DetAtencion {
  nIdAtencion: number;
  nIdTratamiento: number;
  lstTratamiento: Tratamiento[];
  nCantidad: number;
  nPrecio: string;
}