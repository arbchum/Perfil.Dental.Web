import { Component, OnInit } from '@angular/core';
import { MenuOption } from './shared/interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isMobile: boolean = false;
  companyName: string = 'PERFIL DENTAL';
  fullname: string = 'Melissa Diaz Diaz';

  allMenuOptions: MenuOption[] = [
    {
      title: 'Tratamientos',
      icon: 'fa-solid fa-hand-holding-medical',
      url: '/tratamiento/listado'
    },
    {
      title: 'Pacientes',
      icon: 'fa-solid fa-hospital-user',
      url: '/cliente/listado'
    },
    {
      title: 'Atenciones',
      icon: 'fa-solid fa-calendar-day',
      url: '/atencion/listado'
    },
    {
      title: 'Ortodoncia',
      icon: 'fa-regular fa-face-grimace',
      url: '/ortodoncia/listado'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
