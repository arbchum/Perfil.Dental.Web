import { Component, OnInit } from '@angular/core';
import { OrtodonciaNuevoPresenter } from './ortodoncia-nuevo.presenter';

@Component({
  selector: 'app-ortodoncia-nuevo',
  templateUrl: './ortodoncia-nuevo.view.html',
  styleUrls: ['./ortodoncia-nuevo.view.scss'],
  providers: [OrtodonciaNuevoPresenter]
})
export class OrtodonciaNuevoView implements OnInit {

  constructor(public presenter: OrtodonciaNuevoPresenter) { }

  ngOnInit(): void {
    this.presenter.getClientes();
  }
}
