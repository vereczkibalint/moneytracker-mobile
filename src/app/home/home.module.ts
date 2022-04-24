import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionModalComponent } from './transactions/transaction-modal/transaction-modal.component';
import { MorePopoverComponent } from './more-popover/more-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TransactionsComponent, TransactionModalComponent, MorePopoverComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
