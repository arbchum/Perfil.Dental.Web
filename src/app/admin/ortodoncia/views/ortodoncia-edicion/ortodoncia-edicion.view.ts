import { Component, OnInit } from '@angular/core';
import { OrtodonciaEdicionPresenter } from './ortodoncia-edicion.presenter';

@Component({
  selector: 'app-ortodoncia-edicion',
  templateUrl: './ortodoncia-edicion.view.html',
  styleUrls: ['./ortodoncia-edicion.view.scss'],
  providers: [OrtodonciaEdicionPresenter]
})
export class OrtodonciaEdicionView implements OnInit {

  constructor(public presenter: OrtodonciaEdicionPresenter) { }

  ngOnInit(): void {
    this.presenter.init();
  }

}
