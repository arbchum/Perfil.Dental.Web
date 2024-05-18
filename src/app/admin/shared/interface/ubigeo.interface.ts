export interface Provincia {
    nIdUbigeo: number;
    sNombre: string;
    distritos: Distrito[];
}

export interface Distrito {
    nIdUbigeo: number;
    sNombre: string;
}