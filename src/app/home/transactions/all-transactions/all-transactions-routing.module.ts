import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTransactionsPage } from './all-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: AllTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTransactionsPageRoutingModule {}
