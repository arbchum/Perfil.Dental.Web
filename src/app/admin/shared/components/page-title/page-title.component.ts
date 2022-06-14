import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent{
  @Input() prefixIcon: string;
  @Input() title: string;
  @Input() suffixIcon: string;
  @Input() prefixTooltip: string;
  @Input() suffixTooltip: string;
  @Input() showSuffixButton: boolean;
  @Output() clickPrefix: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickSuffix: EventEmitter<void> = new EventEmitter<void>();
}
