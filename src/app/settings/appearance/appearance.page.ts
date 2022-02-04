import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
})
export class AppearancePage implements OnInit {
  selectedAppearance: string = 'system';
  constructor() { }

  ngOnInit() {
  }


  _onSelectionChanged() {
    console.log(this.selectedAppearance)
  }

}
