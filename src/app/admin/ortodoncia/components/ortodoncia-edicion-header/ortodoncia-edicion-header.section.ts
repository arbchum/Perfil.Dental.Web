import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrtodonciaGetResponse } from 'src/app/admin/shared/model';

@Component({
  selector: 'section-ortodoncia-edicion-header',
  templateUrl: './ortodoncia-edicion-header.section.html',
  styleUrls: ['./ortodoncia-edicion-header.section.scss']
})
export class OrtodonciaEdicionHeaderSection implements OnInit {
  @Input() ortodoncia: OrtodonciaGetResponse;
  @Output() sendIdEstado: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
