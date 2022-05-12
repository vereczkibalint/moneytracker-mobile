import { Component, OnInit } from '@angular/core';
import {IonRouterOutlet} from "@ionic/angular";
import {Transaction} from "../../../core/models/transaction.model";
import {TransactionsService} from "../../../core/services/transactions.service";
import {UtilsService} from "../../../core/services/utils.service";

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.page.html',
  styleUrls: ['./all-transactions.page.scss'],
})
export class AllTransactionsPage implements OnInit {
  loadingIndicator: HTMLIonLoadingElement;
  transactions: Transaction[];

  pageNo: number = 0;
  pageSize: number = 10;
  infiniteScrollDisabled: boolean = false;

  constructor(private ionRouterOutlet: IonRouterOutlet, private transactionService: TransactionsService, private utilsService: UtilsService) {
    this.ionRouterOutlet.swipeGesture = false;
  }

  ngOnInit() {
    this._showLoadingIndicator();
    this._loadTransactions(false, "");
  }

  async _loadTransactions(firstLoad: boolean, event) {
    this.transactionService.fetchTransactions(this.pageNo, this.pageSize).subscribe((transactions) => {
      if(transactions.length > 0) {
        this.transactions = [
          ...this.transactions || [],
          ...transactions
        ];

        if(firstLoad) {
          event.target.complete();
        }

        this.pageNo++;
      } else {
        this.infiniteScrollDisabled = true;
      }

      this._hideLoadingIndicator();
    });
  }

  async _loadMoreTransactions(event) {
    this._loadTransactions(true, event);
  }

  _refreshTransactions(event) {
    this.pageNo = 0;
    this.transactions = [];
    this.infiniteScrollDisabled = false;
    this._showLoadingIndicator();
    this._loadTransactions(false, "").then(() => {
      event.target.complete();
      this._hideLoadingIndicator();
    });
  }

  async _showLoadingIndicator() {
    this.loadingIndicator = await this.utilsService.createLoadingIndicator('Your transactions are being loaded...');
    await this.loadingIndicator.present();
  }

  async _hideLoadingIndicator() {
    if(this.loadingIndicator) {
      await this.loadingIndicator.dismiss();
    }
  }
}
