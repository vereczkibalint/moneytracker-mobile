import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../core/services/utils.service";
import {TransactionModalComponent} from "../home/transactions/transaction-modal/transaction-modal.component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  _selectedTab: string;
  currentModal;
  _TABS = {
    TAB_HOME: 'home',
    TAB_BUDGETS: 'budgets',
    TAB_STATISTICS: 'statistics',
    TAB_SETTINGS: 'settings'
  };
  _TABS_WITH_FAB = [this._TABS.TAB_HOME, this._TABS.TAB_BUDGETS];

  constructor(private utilsService: UtilsService) { }

  ngOnInit() { }

  _setSelectedTab(tab) {
    this._selectedTab = tab.tab;
  }

  _checkIfTabIsSelected(tab) {
    return this._selectedTab === tab;
  }

  _isFabNeeded() {
    return this._TABS_WITH_FAB.includes(this._selectedTab);
  }

  async _handleCreateClick() {
    switch(this._selectedTab) {
      case this._TABS.TAB_HOME:
          const modal = await this.utilsService.createModal(TransactionModalComponent, {
            dismiss: () => this._handleCloseModal()
          });

          this.currentModal = modal;
          await modal.present();
        break;
      case this._TABS.TAB_BUDGETS:
        console.log('create budget');
        break;
      default:
        return;
    }
  }

  _handleCloseModal() {
    if(this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

}
