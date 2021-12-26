import {Component, Input, OnInit, Output, ViewEncapsulation,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DaySelectorComponent implements OnInit {

  @Input() selectedDate: Date;
  @Output('onDateSelect') dateSelectionEvent = new EventEmitter<Date>();

  constructor() {}

  ngOnInit() {}

  openDateSelectorModal() {

  }
}
