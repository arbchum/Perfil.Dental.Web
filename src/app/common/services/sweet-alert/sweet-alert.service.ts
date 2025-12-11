import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { PerfildSweetAlertModule } from './sweet-alert.module';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  backdrop: true,
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Injectable({
  providedIn: PerfildSweetAlertModule
})
export class PerfildSweetAlertService {

  iconColor: string;
  backgroundColor: string;
  message: string;

  showLoading(title = 'Cargando ...'): void {
    Swal.fire({
      title,
      allowEscapeKey: false,
      allowOutsideClick: false,
      heightAuto: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  closeLoading(): void { Swal.close() }

  showMessage(icon: SweetAlertIcon, title?: string, timer = 100000): void {
    if (icon == 'success') {
      this.iconColor = '#80D2CE';
      this.backgroundColor = '#c8e6c9';
      this.message = title ?? 'Registro exitoso';
    } else if (icon == 'error') {
      this.iconColor = '#E64442';
      this.backgroundColor = '#ffcdd2';
      this.message = title ?? 'Ha ocurrido un error';
    } else if (icon == 'warning') {
      this.iconColor = '#d9a300';
      this.backgroundColor = '#FFECB3';
      this.message = title ?? 'Advertencia';
    } else if (icon == 'info') {
      this.iconColor = '#696cff';
      this.backgroundColor = '#e9e9ff';
      this.message = title ?? 'Información';
    }


    setTimeout(() => {
      Swal.fire({
        title: this.message,
        icon,
        iconColor: this.iconColor,
        showConfirmButton: false,
        timer,
        heightAuto: false,
        background: this.backgroundColor,
        position: 'center'
      });
    });
  }

  showToast(typeIcon: SweetAlertIcon, title?: string): void {
    if (typeIcon == 'success')
      this.message = title ?? 'Registro exitoso';
    else if (typeIcon == 'error')
      this.message = title ?? 'Ha ocurrido un error';
    else if (typeIcon == 'warning')
      this.message = title ?? 'Advertencia';

    Toast.fire({ 'icon': typeIcon, 'title': this.message })
  }

  ShowConfirmacion(
    title: string,
    icon?: SweetAlertIcon
  ): Promise<SweetAlertResult<any>> {
    if (icon == 'success') {
      this.iconColor = '#3679BC'
    } else if (icon == 'error') {
      this.iconColor = '#E64442'
    } else if (icon == 'info') {
      this.iconColor = '#0284c7'
    }

    return Swal.fire({
      title: `${title}`,
      icon: icon ?? 'question',
      iconColor: this.iconColor,
      showConfirmButton: true,
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3679BC',
      cancelButtonColor: '#E64442',
    })
  }
}
