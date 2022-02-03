import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void { }

  async _openMorePopover(event) {
    const popover = await this.utilsService.createMoreOptionsPopover(event, this._openManageCategories);

    await popover.present();
  }

  _openManageCategories() {
    console.log('asdasd');
  }
}
