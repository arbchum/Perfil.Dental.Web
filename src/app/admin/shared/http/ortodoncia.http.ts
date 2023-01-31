import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, DetOrtodonciaDto, OrtodonciaDto } from '../interface';
import { OrtodonciaRequest } from '../model';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class OrtodonciaHttp {
  private api: string;

  constructor(
    private http: HttpClient
  ) {
    this.api = `${environment.api}/Ortodoncia`;
  }

  getOrtodonciaSearch(): Observable<OrtodonciaDto[]> {
    return this.http.get<ApiResponse<OrtodonciaDto[]>>(`${this.api}/GetSearch`).pipe(
      map(res => res.response)
    );
  }

  createOrtodoncia(request: OrtodonciaRequest): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.api}/Create`, request).pipe(
      map(res => res.response)
    );
  }

  getDetailOrtodoncia(nIdOrtodoncia: number): Observable<DetOrtodonciaDto[]> {
    let params = new HttpParams().set('nIdOrtodoncia', JSON.stringify(nIdOrtodoncia));
    return this.http.get<ApiResponse<DetOrtodonciaDto[]>>(`${this.api}/GetDetail`, { params }).pipe(
      map(res => res.response)
    );
  }
}
