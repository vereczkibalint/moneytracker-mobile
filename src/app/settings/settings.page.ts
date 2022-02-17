import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSelect} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentTheme: string;
  @ViewChild('appearanceSelector') appearanceSelector: IonSelect;

  constructor() { }

  ngOnInit() {
    this.currentTheme = 'dark';
  }

  async _toggleAppearanceSelector() {
    await this.appearanceSelector.open();
  }
}
