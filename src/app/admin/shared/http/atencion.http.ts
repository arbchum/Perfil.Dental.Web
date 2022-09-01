import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminHttpModule } from './http.module';

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

  sendAtencionCreate(atencion: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/Create`, atencion);
  }

  getAtencionHistorical(nIdCliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/GetHistorical/${nIdCliente}`);
  }
}
