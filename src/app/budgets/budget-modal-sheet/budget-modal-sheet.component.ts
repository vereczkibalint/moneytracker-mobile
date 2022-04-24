import {Component, Input, OnInit } from '@angular/core';
import {BudgetService} from "../../core/services/budget.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateHexadecimalValue} from "../../core/validators/hexadecimal.validator";
import {validateCurrency} from "../../core/validators/currency.validator";
import {UtilsService} from "../../core/services/utils.service";

@Component({
  selector: 'app-budget-modal-sheet',
  templateUrl: './budget-modal-sheet.component.html',
  styleUrls: ['./budget-modal-sheet.component.scss'],
})
export class BudgetModalSheetComponent implements OnInit {
  @Input() dismiss;

  budgetForm: FormGroup;
  submitted: boolean = false;
  color: string = '';
  isLoading: Promise<boolean>;

  form_messages = {
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


  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService, private utilsService: UtilsService) {
    this.color = this._generateRandomHexaColor();
  }

  ngOnInit() {
    this.budgetForm = this.formBuilder.group({
      title: [null, Validators.required],
      budgetAmount: [0, [Validators.required, Validators.min(1)]],
      budgetTarget: [null, Validators.required],
      colorCode: [this.color, [Validators.required, validateHexadecimalValue]],
      currency: [null, [Validators.required, validateCurrency]]
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

    let loadingIndicator = await this.utilsService.createLoadingIndicator('Your budget is being created...');
    await loadingIndicator.present();

    this.submitted = true;
    if(this.budgetForm.valid) {
      this.budgetService.createBudget({
        title: this.budgetForm.controls['title'].value,
        budgetAmount: this.budgetForm.controls['budgetAmount'].value,
        currency: this.budgetForm.controls['currency'].value,
        budgetTarget: this.budgetForm.controls['budgetTarget'].value,
        colorCode: this.budgetForm.controls['colorCode'].value
      }).subscribe(() => {
        this.isLoading = Promise.resolve(false);
        loadingIndicator.dismiss();
        this.dismiss();
      }, (error) => {
        console.log('error', error);
      });
    }
  }
}
