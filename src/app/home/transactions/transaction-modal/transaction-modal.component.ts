import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
})
export class TransactionModalComponent implements OnInit {
  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {}
}
