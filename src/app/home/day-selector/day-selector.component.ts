import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DaySelectorComponent implements OnInit {

  _yearMapping: number[];

  constructor() {
    this._yearMapping = this._populateCurrentYear();
  }

  ngOnInit() {}

  _populateCurrentYear() {
    const result = [];

    const currentYear = new Date().getFullYear();

    Array.from({ length: 12 }, (_, i) => {
      const currentMonth = i + 1;
      result[currentMonth] = new Date(currentYear, currentMonth, 0).getDate();
    });

    return result;
  }

}
