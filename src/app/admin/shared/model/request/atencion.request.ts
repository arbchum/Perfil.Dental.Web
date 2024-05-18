import { AtencionUI, DetAtencionUI } from "..";

export class AtencionRequest {
  sNota: string;
  nIdCliente: number;
  detAtencion: DetAtencionRequest[];
  constructor(form: AtencionUI) {
    this.sNota = form.sNota;
    this.nIdCliente = form.nIdCliente;
    this.detAtencion = form.detAtencion.map((item) => new DetAtencionRequest(item));
  }
}

export class DetAtencionRequest {
  nIdTratamiento: number;
  nCantidad: number;
  nPrecio: number;
  constructor(form: DetAtencionUI) {
    this.nIdTratamiento = form.nIdTratamiento;
    this.nCantidad = form.nCantidad;
    this.nPrecio = Number(form.nPrecio);
  }
}