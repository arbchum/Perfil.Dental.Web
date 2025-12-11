import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AtencionHttp } from '../../shared/http';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AtencionGetResponse, DetAtencionGetResponse } from '../../shared/model';

@Component({
  selector: 'app-atencion-ver',
  templateUrl: './atencion-ver.component.html',
  styleUrls: ['./atencion-ver.component.scss']
})
export class AtencionVerComponent implements OnInit {
  dataSource: MatTableDataSource<DetAtencionGetResponse> = new MatTableDataSource()
  displayedColumns: string[] = []
  atencion?: AtencionGetResponse
  id: number

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Nro.', field: 'nNro', type: 'index', width: 5, align: 'center', hidefooter: false, colspan: 4, alignfoot: 'right' },
    { header: 'Tratamiento', field: 'sNomTratamiento', type: '', width: 50, align: 'left', hidefooter: true, colspan: 1, alignfoot: 'center' },
    { header: 'Cantidad', field: 'nCantidad', type: '', width: 15, align: 'right', hidefooter: true, colspan: 1, alignfoot: 'center' },
    { header: 'Precio', field: 'nPrecio', type: 'deci2', width: 15, align: 'right', hidefooter: true, colspan: 1, alignfoot: 'center' },
    { header: 'Importe', field: 'nImporte', type: 'deci2', width: 15, align: 'right', hidefooter: false, colspan: 1, alignfoot: 'center' },
  ]
  /* #endregion */

  constructor(
    private atencionHttp: AtencionHttp,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field)
    this.id = this.activatedRoute.snapshot.params['id']
  }

  ngOnInit() {
    this.init()
  }

  init(): void {
    forkJoin({
      resAtencion: this.atencionHttp.getAtencionResponse(this.id),
    }).subscribe(({ resAtencion }) => {
      this.atencion = resAtencion
      this.dataSource.data = this.atencion.tratamientos
      this.cd.detectChanges();
    });
  }

  goAtencionListado(): void {
    this.router.navigateByUrl('/atencion/listado');
  }

}
