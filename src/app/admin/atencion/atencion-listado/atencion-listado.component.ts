import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PerfildSweetAlertService } from 'src/app/common';
import { AtencionHttp } from '../../shared/http';
import { AtencionDto } from '../../shared/interface';

@Component({
  selector: 'app-atencion-listado',
  templateUrl: './atencion-listado.component.html',
  styleUrls: ['./atencion-listado.component.scss']
})
export class AtencionListadoComponent implements OnInit {
  atenciones: AtencionDto[];

  constructor(
    private atencionHttp: AtencionHttp,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listarAtenciones();
  }

  listarAtenciones(): void {
    this.atencionHttp.getAtencionSearch().subscribe(
      res => {
        this.atenciones = res;
      }
    );
  }

  goAtencionNewForm(): void {
    this.router.navigateByUrl('/atencion/nuevo');
  }

  goAtencionForm(id?: number): void {
    this.router.navigate(['../nuevo', id ?? 0], { relativeTo: this.activatedRoute });
  }

  goAtencionVer(id: number): void {
    this.router.navigate(['../ver', id], { relativeTo: this.activatedRoute });
  }

}
