import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfildSweetAlertService } from 'src/app/common';
import { OrtodonciaHttp } from '../../shared/http';
import { DetOrtodonciaDto, OrtodonciaDto } from '../../shared/interface';

@Component({
  selector: 'app-ortodoncia-listado',
  templateUrl: './ortodoncia-listado.component.html',
  styleUrls: ['./ortodoncia-listado.component.scss']
})
export class OrtodonciaListadoComponent implements OnInit {
  ortodoncias: OrtodonciaDto[];
  detOrtodoncia: DetOrtodonciaDto[];

  constructor(
    private ortodonciaHttp: OrtodonciaHttp,
    private router: Router,
    private alert: PerfildSweetAlertService
  ) { }

  ngOnInit(): void {
    this.listarOrtodoncias();
  }

  listarOrtodoncias(): void {
    this.ortodonciaHttp.getOrtodonciaSearch().subscribe(
      res => {
        this.ortodoncias = res;
      }
    );
  }

  goOrtodonciaForm(): void {
    this.router.navigateByUrl('/ortodoncia/nuevo');
  }


  listarDetOrtodoncia(ortodoncia: OrtodonciaDto): void {
    this.detOrtodoncia = [];
    if (ortodoncia.nCantidadSesiones == 0) return;
    this.ortodonciaHttp.getDetailOrtodoncia(ortodoncia.nIdOrtodoncia).subscribe(
      res => {
        this.detOrtodoncia = res;
      }
    );
  }
}
