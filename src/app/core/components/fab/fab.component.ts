import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {
  @Input() pressHandler;

  constructor() { }

  ngOnInit() {}

  _handlePress() {
    if(this.pressHandler) {
      this.pressHandler();
    }
  }
}
