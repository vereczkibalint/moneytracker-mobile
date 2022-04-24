import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSelect} from "@ionic/angular";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild('appearanceSelector') appearanceSelector: IonSelect;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  async _toggleAppearanceSelector() {
    await this.appearanceSelector.open();
  }

  logout() {
    this.authService.logout();
  }
}
