import { Component, OnDestroy, OnInit } from '@angular/core';
import { BudgetService } from '../core/services/budget.service';
import { Subscription } from 'rxjs';
import { Budget } from '../core/models/budget.model';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit, OnDestroy {
  budgetSubscription$: Subscription;
  budgetResponse: Budget[];
  budgetsLoaded: Promise<boolean>;

  constructor(
    private budgetService: BudgetService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this._loadBudgets();
  }

  ngOnDestroy() {
    this.budgetSubscription$.unsubscribe();
  }

  async _loadBudgets() {
    this.budgetsLoaded = Promise.resolve(false);

    let loadingIndicator = await this.utilsService.createLoadingIndicator('Your budgets are being loaded...');
    await loadingIndicator.present();

    this.budgetSubscription$ = this.budgetService.fetchAllBudget().subscribe((response) => {
      this.budgetResponse = response;
      this.budgetsLoaded = Promise.resolve(true);
      loadingIndicator.dismiss();
    });
  }

  _refreshBudgets(event) {
    this._loadBudgets().then(() => {
      event.target.complete();
    });
  }

}
