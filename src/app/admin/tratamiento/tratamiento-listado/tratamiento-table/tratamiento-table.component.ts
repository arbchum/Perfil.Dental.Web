import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tratamiento } from 'src/app/admin/shared/interface';

@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.scss']
})
export class TratamientoTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() sendTratamiento: EventEmitter<Tratamiento> = new EventEmitter<Tratamiento>();
  @Input() tratamientos: Tratamiento[];
  dataSource: MatTableDataSource<Tratamiento>;
  displayedColumns: string[] = [];
  pageSizeOptions: number[] = [10, 50, 100];

  /* #region   Asignación nombres de campos y columnas*/
  cols: any[] = [
    { header: 'Código', field: 'sCodigo', type: null, width: '50', align: 'center' },
    { header: 'Nombre', field: 'sNombre', type: null, width: '200', align: 'left' },
    { header: 'Precio', field: 'nPrecio', type: null, width: '100', align: 'right' },
    { header: 'Fecha y Hora de Registro', field: 'sFechaReg', type: null, width: '200', align: 'center' },
    { header: 'Acción', field: 'accion', type: 'accion', width: '60', align: 'center' },
  ];
  /* #endregion */

  constructor(
    private fb: FormBuilder
  ) {
    this.displayedColumns = this.cols.map(({ field }) => field);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tratamientos'] && this.tratamientos) {
      this.dataSource = new MatTableDataSource<Tratamiento>(this.tratamientos);
      this.dataSource.paginator = this.paginator;
    }
  }

  get isEmpty(): boolean {
    return this.dataSource && this.dataSource.filteredData.length === 0;
  }

  editarTratamiento(nIdTratamiento: number): void {

  }

  /* #region  Método de filtración del listado */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* #endregion */

  fnClean(): void {
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
  }
}
