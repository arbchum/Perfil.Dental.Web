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
      title: 'Atenciones',
      icon: 'insert_invitation',
      url: '/atencion/listado'
    },
    {
      title: 'Pacientes',
      icon: 'group',
      url: '/cliente/listado'
    },
    {
      title: 'Ortodoncia',
      icon: 'group',
      url: '/ortodoncia/listado'
    },
    {
      title: 'Tratamientos',
      icon: 'volunteer_activism',
      url: '/tratamiento/listado'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
