import { Component, Input, OnInit } from '@angular/core';
import { Budget } from '../../core/models/budget.model';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss'],
})
export class BudgetCardComponent implements OnInit {
  @Input() budget: Budget;
  constructor() { }

  ngOnInit() { }

}
