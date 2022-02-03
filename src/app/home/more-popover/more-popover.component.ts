import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-popover',
  styleUrls: ['./more-popover.component.scss'],
  template: `
  <ion-list lines="none">
    <ion-item (click)="this._handleMenuSelect()">
      <ion-text>Manage categories</ion-text>
    </ion-item>
  </ion-list>
  `
})
export class MorePopoverComponent implements OnInit {
  @Input() selectionHandler;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async _handleMenuSelect() {
    await this.popoverController.dismiss();
    this.selectionHandler();
  }
}
