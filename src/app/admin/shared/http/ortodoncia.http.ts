import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, DetOrtodonciaDataDto, OrtodonciaDataDto } from '../interface';
import { DetOrtodonciaRequest, OrtodonciaGetResponse, OrtodonciaRequest } from '../model';
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

  getOrtodonciaSearch(): Observable<OrtodonciaDataDto[]> {
    return this.http.get<ApiResponse<OrtodonciaDataDto[]>>(`${this.api}/GetSearch`).pipe(
      map(res => res.response)
    );
  }

  getOrtodonciaOne(nIdPaciente: number): Observable<OrtodonciaGetResponse> {
    return this.http.get<ApiResponse<OrtodonciaGetResponse>>(`${this.api}/GetOne/${nIdPaciente}`).pipe(
      map(res => res.response)
    );
  }

  createOrtodoncia(request: OrtodonciaRequest): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.api}/Create`, request).pipe(
      map(res => res.response)
    );
  }

  getDetailOrtodoncia(nIdOrtodoncia: number, nNumTop?: number): Observable<DetOrtodonciaDataDto[]> {
    let params = new HttpParams()
      .set('nIdOrtodoncia', JSON.stringify(nIdOrtodoncia))
      .set('nNumTop', JSON.stringify(nNumTop));
    return this.http.get<ApiResponse<DetOrtodonciaDataDto[]>>(`${this.api}/GetDetail`, { params }).pipe(
      map(res => res.response)
    );
  }

  createOrUpdateDetOrtodoncia(request: DetOrtodonciaRequest): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.api}/CreateOrUpdateDetOrtodoncia`, request).pipe(
      map(res => res.response)
    );
  }
}
