import { Component, OnInit } from '@angular/core';

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
  _TABS_WITH_FAB = [this._TABS.TAB_HOME, this._TABS.TAB_BUDGETS];

  constructor() { }

  ngOnInit() {
  }

  _setSelectedTab(tab) {
    this._selectedTab = tab.tab;
  }

  _checkIfTabIsSelected(tab) {
    return this._selectedTab === tab;
  }

  _isFabNeeded() {
    return this._TABS_WITH_FAB.includes(this._selectedTab);
  }

  _handleCreateClick() {
    switch(this._selectedTab) {

    }
  }
}
