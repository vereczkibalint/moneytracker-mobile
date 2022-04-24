export interface Budget {
  id?: number;
  budgetTarget: Date;
  title: string;
  budgetAmount: number;
  remainingAmount?: number;
  currency: string;
  colorCode: string;
}
