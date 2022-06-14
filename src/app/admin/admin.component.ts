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
      title: 'Clientes',
      icon: 'bookmark',
      url: '/cliente/cliente-listado'
    },
    // {
    //   title: 'Tratamientos',
    //   icon: 'bookmark',
    //   url: '/tratamiento/listado'
    // },
    {
      title: 'Atenciones',
      icon: 'bookmark',
      url: '/atencion/atencion-listado'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
