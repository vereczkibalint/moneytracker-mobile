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
  _TABS = {
    TAB_HOME: 'home',
    TAB_BUDGETS: 'budgets',
    TAB_STATISTICS: 'statistics',
    TAB_SETTINGS: 'settings'
  };

  constructor() { }

  ngOnInit() { }

  _setSelectedTab(tab) {
    this._selectedTab = tab.tab;
  }

  _checkIfTabIsSelected(tab) {
    return this._selectedTab === tab;
  }

}
