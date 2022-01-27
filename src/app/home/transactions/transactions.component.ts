import { Component, OnInit, Input } from '@angular/core';
import {TransactionResult} from "./transaction.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() selectedDate: Date;

  TRANSACTIONS: TransactionResult = {
    transactions: [
      {
        id: 1,
        userId: 1,
        title: 'Shopping',
        description: 'LIDL shopping for Christmas',
        type: 'EXPENSE',
        amount: 5000,
        issueDate: new Date(2021, 12, 18)
      },
      {
        id: 2,
        userId: 1,
        title: 'Christmas Gifts',
        description: 'Hehe ugyse tudod meg mi az',
        type: 'EXPENSE',
        amount: 8500,
        issueDate: new Date(2021, 12 ,20)
      },
      {
        id: 3,
        userId: 1,
        title: 'Macbook Pro',
        description: 'OMG ITS A MACBOOK',
        type: 'EXPENSE',
        amount: 160000,
        issueDate: new Date(2021, 10, 18)
      },
      {
        id: 4,
        userId: 1,
        title: 'Wage',
        description: 'Payday',
        type: 'INCOME',
        amount: 339150,
        issueDate: new Date(2021, 12, 6)
      }
    ],
    sum: 339150
  };

  // TRANSACTIONS = [];

  constructor() { }

  ngOnInit() { }

}
