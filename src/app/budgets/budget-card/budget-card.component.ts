import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Budget } from '../../core/models/budget.model';
import {AlertController, PopoverController} from "@ionic/angular";
import {BudgetsPopoverComponent} from "../budgets-popover/budgets-popover.component";
import {BudgetService} from "../../core/services/budget.service";

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent implements OnInit {
  @Input() budget: Budget;
  @Output() pageShouldRefresh = new EventEmitter();
  budgetPopover: HTMLIonPopoverElement;

  constructor(private budgetService: BudgetService, private popoverController: PopoverController, private alertController: AlertController) { }

  ngOnInit() { }

  async _handleMoreClick(event, budget: Budget) {
    const morePopover = await this.popoverController.create({
      component: BudgetsPopoverComponent,
      componentProps: {
        onEdit: () => this._handleEdit(budget),
        onDelete: () => this._handleDelete(budget)
      },
      animated: false,
      translucent: true,
      showBackdrop: false,
      mode: 'ios',
      event
    });
    this.budgetPopover = morePopover;

    await this.budgetPopover.present();
  }

  async _handleEdit(budget: Budget) {
    await this.budgetPopover.dismiss();
    this.budgetPopover = null;
  }

  async _handleDelete(budget: Budget) {
    await this.budgetPopover.dismiss();
    this.budgetPopover = null;

    const deleteAlert = await this._constructDeleteConfirmAlert(budget);
    await deleteAlert.present();
  }

  _deleteBudget(budgetId: number) {
    this.budgetService.deleteBudget(budgetId).subscribe(() => {
      this.pageShouldRefresh.emit();
    }, () => {
      this.pageShouldRefresh.emit();
    });
  }

  async _constructDeleteConfirmAlert(budget: Budget) {
    return await this.alertController.create({
      header: 'Delete confirmation',
      message: 'Are you sure you want to delete this budget?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      }, {
        text: 'Confirm',
        handler: () => {
          this._deleteBudget(budget.id);
        }
      }]
    });
  }

}
