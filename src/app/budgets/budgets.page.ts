import { Component, OnDestroy, OnInit } from '@angular/core';
import { BudgetService } from '../core/services/budget.service';
import {Observable, Subscription} from 'rxjs';
import { Budget } from '../core/models/budget.model';
import { UtilsService } from '../core/services/utils.service';
import {ModalController} from "@ionic/angular";
import {BudgetModalSheetComponent} from "./budget-modal-sheet/budget-modal-sheet.component";

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit, OnDestroy {
  budgetSubscription$: Subscription;
  budgetResponse: Budget[];
  budgetsLoaded: Promise<boolean>;
  sheetModal = null;
  apiErrors: Observable<any>;

  constructor(
    private budgetService: BudgetService,
    private utilsService: UtilsService,
    private modalController: ModalController
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
      if(event) {
        event.target.complete();
      }
    });
  }

  async _openSheetModal() {
    const sheetModal = await this.modalController.create({
      component: BudgetModalSheetComponent,
      swipeToClose: true,
      componentProps: {
        apiErrors: this.apiErrors,
        dismiss: () => this._dismissModal()
      }
    });

    this.sheetModal = sheetModal;
    await sheetModal.present();
  }

  _dismissModal() {
    if(this.sheetModal) {
      this.sheetModal.dismiss().then(() => {
        this.sheetModal = null;
        this._loadBudgets();
      })
    }
  }

}
