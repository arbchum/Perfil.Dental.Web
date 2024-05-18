import { Injectable } from '@angular/core';
import { BaseModule } from './base.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: BaseModule
})
export class BaseService {

  constructor(private dialog: MatDialog) { }

  openDialog<TReponse>(component: ComponentType<unknown>, data?: unknown, anchopx = 600): MatDialogRef<unknown, TReponse> {
    return this.dialog.open(component, {
      disableClose: true,
      autoFocus: false,
      height: 'auto',
      width: `${anchopx}px`,
      data: data
    });
  }
}
