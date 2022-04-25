import {Category} from "./category.model";
import {Budget} from "./budget.model";

export type TransactionType = 'EXPENSE' | 'INCOME';

export interface Transaction {
  id: number;
  budget: Budget;
  title: string;
  description: string;
  transactionType: TransactionType;
  amount: number;
  issueDate: Date;
  category: Category;
}

export interface TransactionResult {
  transactions: Transaction[];
  total: number;
}
