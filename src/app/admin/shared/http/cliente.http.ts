import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, ClienteDto, Provincia } from '../interface';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class ClienteHttp {

  private api: string;

  constructor(
    private http: HttpClient
  ) {
    this.api = `${environment.api}/Cliente`;
  }

  getClienteSearch(): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>(`${this.api}/GetSearch`);
  }

  sendClienteCreateOrUpdate(cliente: Cliente): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/CreateOrUpdate`, cliente);
  }

  getClienteOne(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.api}/GetOne/${id}`);
  }

  getUbigeoAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.api}/GetUbigeoAll`);
  }

  getClienteByNroDocumento(sNroDocumento: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.api}/GetOneByDocument/${sNroDocumento}`);
  }
}
