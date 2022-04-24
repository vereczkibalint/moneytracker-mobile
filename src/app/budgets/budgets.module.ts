import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import {BudgetModalSheetComponent} from "./budget-modal-sheet/budget-modal-sheet.component";
import {ColorPickerModule} from "ngx-color-picker";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,
    ColorPickerModule,
    ReactiveFormsModule
  ],
    declarations: [BudgetsPage, BudgetCardComponent, BudgetModalSheetComponent]
})
export class BudgetsPageModule {}
