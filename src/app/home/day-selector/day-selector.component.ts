import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit {
  selectedDate;

  constructor() {
    this.selectedDate = new Date().toISOString();
  }

  ngOnInit() {}
}
