import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Budget } from '../../core/models/budget.model';
import {AlertController, ModalController, PopoverController} from "@ionic/angular";
import {BudgetsPopoverComponent} from "../budgets-popover/budgets-popover.component";
import {BudgetService} from "../../core/services/budget.service";
import {BudgetModalSheetComponent} from "../budget-modal-sheet/budget-modal-sheet.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent implements OnInit {
  @Input() budget: Budget;
  @Output() pageShouldRefresh = new EventEmitter();
  budgetPopover: HTMLIonPopoverElement;
  sheetModal: HTMLIonModalElement;
  apiErrors: Observable<any>;

  constructor(private budgetService: BudgetService, private popoverController: PopoverController, private modalController: ModalController, private alertController: AlertController) { }

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

    const sheetModal = await this.modalController.create({
      component: BudgetModalSheetComponent,
      swipeToClose: true,
      componentProps: {
        budget: budget,
        apiErrors: this.apiErrors,
        dismiss: () => this._dismissModal()
      }
    });

    this.sheetModal = sheetModal;
    await sheetModal.present();
  }

  async _dismissModal() {
    if(this.sheetModal) {
      await this.sheetModal.dismiss();
      this.sheetModal = null;
      this.pageShouldRefresh.emit();
    }
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
