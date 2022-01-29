export type TransactionType = 'EXPENSE' | 'INCOME';

export interface Transaction {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: TransactionType;
  amount: number;
  issueDate: Date;
}

export interface TransactionResult {
  transactions: Transaction[];
  total: number;
}
