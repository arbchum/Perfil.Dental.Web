import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-perfil-dental',
  templateUrl: './button-perfil-dental.component.html',
  styleUrls: ['./button-perfil-dental.component.scss']
})
export class ButtonPerfilDentalComponent implements OnInit {
  @Input() name: string = '';
  @Input() icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
