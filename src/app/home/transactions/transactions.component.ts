import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransactionResult } from "../../core/models/transaction.model";
import { TransactionsService } from '../../core/services/transactions.service';
import { LoadingController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @Input() selectedDate: Date;
  transactionsLoaded: Promise<boolean>;
  fetchTransactionsSubscription$: Subscription;
  transactionsResponse: TransactionResult;

  constructor(private transactionService: TransactionsService, private loadingController: LoadingController) { }

  ngOnInit() {
    this._loadTransactions();
  }

  async _loadTransactions() {
    this.transactionsLoaded = Promise.resolve(false);

    let loadingIndicator = await this._createLoadingIndicator();
    await loadingIndicator.present();

    this.fetchTransactionsSubscription$ = this.transactionService.fetchAllTransaction().subscribe((response) => {
      this.transactionsResponse = response;
      this.transactionsLoaded = Promise.resolve(true);
      loadingIndicator.dismiss();
    });
  }

  _createLoadingIndicator() {
    return this.loadingController.create({
      message: 'Your transactions are being loaded...',
    });
  }

  ngOnDestroy(): void {
    this.fetchTransactionsSubscription$.unsubscribe();
  }

  _refreshTransactions(event) {
    this._loadTransactions().then(() => {
      event.target.complete();
    });
  }
}
