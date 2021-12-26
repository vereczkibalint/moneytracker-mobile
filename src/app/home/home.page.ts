import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionModalComponent } from './transactions/transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedDate: Date;
  transactionModal = null;

  constructor(private modalController: ModalController) {
    this.selectedDate = new Date();
  }

  async handleAddTransaction() {
    const modal = await this.modalController.create({
      component: TransactionModalComponent,
      componentProps: {
        dismiss: () => this.dismissModal()
      }
    });

    this.transactionModal = modal;

    return await modal.present();
  }

  async handleEditTransaction(transaction) {
    const modal = await this.modalController.create({
      component: TransactionModalComponent,
      componentProps: {
        transaction,
        dismiss: () => this.dismissModal()
      }
    });

    this.transactionModal = modal;

    return await modal.present();
  }

  dismissModal() {
    if(this.transactionModal) {
      this.transactionModal.dismiss().then(() => {
        this.transactionModal = null;
      });
    }
  }

  onSelectedDateChange(date) {
    this.selectedDate = date;
  }
}
