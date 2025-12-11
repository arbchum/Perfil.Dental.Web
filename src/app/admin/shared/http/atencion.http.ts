import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminHttpModule } from './http.module';
import { AtencionGetResponse, AtencionRequest } from '../model';

@Injectable({
  providedIn: AdminHttpModule
})
export class AtencionHttp{
  private api: string;

  constructor(
    private http: HttpClient
  ) {
    this.api = `${environment.api}/Atencion`;
  }

  getAtencionSearch(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/GetSearch`);
  }

  createAtencion(request: AtencionRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/Create`, request);
  }

  getAtencionHistorical(nIdCliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/GetHistorical/${nIdCliente}`);
  }

  getAtencionResponse(id: number): Observable<AtencionGetResponse> {
    return this.http.get<AtencionGetResponse>(`${this.api}/GetOne/${id}`);
  }
}
