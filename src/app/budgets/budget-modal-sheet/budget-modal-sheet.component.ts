import {Component, Input, OnInit } from '@angular/core';
import {BudgetService} from "../../core/services/budget.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateHexadecimalValue} from "../../core/validators/hexadecimal.validator";
import {validateCurrency} from "../../core/validators/currency.validator";
import {UtilsService} from "../../core/services/utils.service";
import {Budget} from "../../core/models/budget.model";

@Component({
  selector: 'app-budget-modal-sheet',
  templateUrl: './budget-modal-sheet.component.html',
  styleUrls: ['./budget-modal-sheet.component.scss'],
})
export class BudgetModalSheetComponent implements OnInit {
  @Input() dismiss;
  @Input() budget?: Budget;

  budgetForm: FormGroup;
  submitted: boolean = false;
  color: string = '';
  isLoading: Promise<boolean>;

  FORM_MESSAGES = {
    'title': [
      { type: 'required', message: 'Title is required!' },
    ],
    'budgetAmount': [
      { type: 'required', message: 'Budget amount is required!' },
      { type: 'min', message: 'Budget amount must be greater or equal to 1!' }
    ],
    'budgetTarget': [
      { type: 'required', message: 'Budget target is required!' },
    ],
    'colorCode': [
      { type: 'required', message: 'Color code is required!' },
    ],
    'currency': [
      { type: 'required', message: 'Currency is required!' },
    ],
  };


  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.color = this.budget?.colorCode ?? this._generateRandomHexaColor();

    this.budgetForm = this.formBuilder.group({
      title: [this.budget?.title ?? null, Validators.required],
      budgetAmount: [this.budget?.budgetAmount ?? 0, [Validators.required, Validators.min(1)]],
      budgetTarget: [this.budget?.budgetTarget ?? null, Validators.required],
      colorCode: [this.color, [Validators.required, validateHexadecimalValue]],
      currency: [this.budget?.currency ?? null, [Validators.required, validateCurrency]]
    });
  }

  _generateRandomHexaColor() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }

  _onColorPickerChanged(newColor: string): void {
    this.color = newColor;
    this.budgetForm.patchValue({ colorCode: newColor });
  }

  async _submitBudget() {
    this.isLoading = Promise.resolve(true);

    this.submitted = true;
    if(this.budgetForm.valid) {
      let loadingIndicator = await this.utilsService.createLoadingIndicator(this.budget ? 'Your budget is being updated...' : 'Your budget is being created...');
      await loadingIndicator.present();

      const budgetDto = {
        title: this.budgetForm.controls['title'].value,
        budgetAmount: this.budgetForm.controls['budgetAmount'].value,
        currency: this.budgetForm.controls['currency'].value,
        budgetTarget: this.budgetForm.controls['budgetTarget'].value,
        colorCode: this.budgetForm.controls['colorCode'].value
      };
      if(this.budget) {
        this.budgetService.updateBudget(budgetDto, this.budget.id).subscribe(() => {
          this.isLoading = Promise.resolve(false);
          loadingIndicator.dismiss();
          this.dismiss();
        }, (error) => {
          console.log('error during update', error);
        })
      } else {
        this.budgetService.createBudget(budgetDto).subscribe(() => {
          this.isLoading = Promise.resolve(false);
          loadingIndicator.dismiss();
          this.dismiss();
        }, (error) => {
          console.log('error', error);
        });
      }
    }
  }
}
