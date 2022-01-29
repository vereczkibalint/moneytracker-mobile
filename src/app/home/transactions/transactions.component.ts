import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction, TransactionResult } from "../../core/models/transaction.model";
import { TransactionsService } from '../../core/services/transactions.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';

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

  transactionModal = null;

  constructor(
    private transactionService: TransactionsService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this._loadTransactions();
  }

  ngOnDestroy(): void {
    this.fetchTransactionsSubscription$.unsubscribe();
  }

  private async _loadTransactions() {
    this.transactionsLoaded = Promise.resolve(false);

    let loadingIndicator = await this._createLoadingIndicator();
    await loadingIndicator.present();

    this.fetchTransactionsSubscription$ = this.transactionService.fetchAllTransaction().subscribe((response) => {
      this.transactionsResponse = response;
      this.transactionsLoaded = Promise.resolve(true);
      loadingIndicator.dismiss();
    });
  }

  private _createLoadingIndicator() {
    return this.loadingController.create({
      message: 'Your transactions are being loaded...',
    });
  }

  private _refreshTransactions(event) {
    this._loadTransactions().then(() => {
      event.target.complete();
    });
  }

  private async _handleEdit(slidingItem, transaction: Transaction) {
    slidingItem.close();

    const modal = await this._constructTransactionModal(transaction);

    return await modal.present();
  }

  private async _handleDelete(slidingItem, transaction: Transaction) {
    slidingItem.close();
    const alert = await this._constructDeleteAlert(transaction);

    await alert.present();
  }

  private async _deleteTransaction(transactionId: number) {
    this.transactionService.deleteTransaction(transactionId).subscribe(() => {
      this._loadTransactions();
    });
  }

  private async _constructTransactionModal(transaction: Transaction) {
    const modal = await this.modalController.create({
      component: TransactionModalComponent,
      componentProps: {
        transaction,
        dismiss: () => this._dismissModal()
      }
    });

    this.transactionModal = modal;

    return modal;
  }

  private async _constructDeleteAlert(transaction: Transaction) {
    const deleteAlert = await this.alertController.create({
      header: 'Delete confirmation',
      message: 'Are you sure you want to delete this transaction?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      }, {
        text: 'Confirm',
        handler: () => {
          this._deleteTransaction(transaction.id);
        }
      }]
    });

    return deleteAlert;
  }

  private _dismissModal() {
    if(this.transactionModal) {
      this.transactionModal.dismiss().then(() => {
        this.transactionModal = null;
      });
    }
  }
}
