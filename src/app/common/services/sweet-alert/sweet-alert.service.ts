import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { PerfildSweetAlertModule } from './sweet-alert.module';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

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

  closeLoading(): void {
    Swal.close();
  }

  showMessage(icon: SweetAlertIcon, title?: string, timer = 2000): void {
    if (icon == 'success') {
      this.iconColor = '#80D2CE';
      this.backgroundColor = '#c8e6c9';
      this.message = title ?? 'Registro exitoso';
    } else if (icon == 'error') {
      this.iconColor = '#E64442';
      this.backgroundColor = '#ffcdd2';
      this.message = title ?? 'Ha ocurrido un error';
    }else if (icon == 'warning') {
      this.iconColor = '#d9a300';
      this.backgroundColor = '#FFECB3';
      this.message = title ?? 'Advertencia';
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
        position: 'center',
        allowOutsideClick: false,
      });
    });
  }

  showToast(typeIcon: SweetAlertIcon, title?: string):void{
    if (typeIcon == 'success') {
      this.message = title ?? 'Registro exitoso';
    } else if (typeIcon == 'error') {
      this.message = title ?? 'Ha ocurrido un error';
    }else if (typeIcon == 'warning') {
      this.message = title ?? 'Advertencia';
    }
    Toast.fire({
      icon: typeIcon,
      title: this.message
    })
  }
}
