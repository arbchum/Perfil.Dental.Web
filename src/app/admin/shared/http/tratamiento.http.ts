import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tratamiento } from '../interface';
import { AdminHttpModule } from './http.module';

@Injectable({
  providedIn: AdminHttpModule
})
export class TratamientoHttp {
  private api: string;

  constructor(
    private http: HttpClient
  ) {
    this.api = `${environment.api}/Tratamiento`;
  }

  getTratamientoSearch(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.api}/GetSearch`);
  }
}
