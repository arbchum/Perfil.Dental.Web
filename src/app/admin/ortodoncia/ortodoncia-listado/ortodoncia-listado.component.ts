import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrtodonciaHttp } from '../../shared/http';
import { OrtodonciaDto } from '../../shared/interface/ortodoncia.interface';

@Component({
  selector: 'app-ortodoncia-listado',
  templateUrl: './ortodoncia-listado.component.html',
  styleUrls: ['./ortodoncia-listado.component.scss']
})
export class OrtodonciaListadoComponent implements OnInit {
  ortodoncias: OrtodonciaDto[];

  constructor(
    private ortodonciaHttp: OrtodonciaHttp,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listarAtenciones();
  }

  listarAtenciones(): void {
    this.ortodonciaHttp.getOrtodonciaSearch().subscribe(
      res => {
        this.ortodoncias = res;
      }
    );
  }

  goOrtodonciaForm(id?: number): void {
    this.router.navigate(['../nuevo', id ?? 0], { relativeTo: this.activatedRoute });
  }

}
