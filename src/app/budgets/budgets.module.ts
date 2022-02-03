import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { BudgetCardComponent } from './budget-card/budget-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule
  ],
    declarations: [BudgetsPage, BudgetCardComponent]
})
export class BudgetsPageModule {}
