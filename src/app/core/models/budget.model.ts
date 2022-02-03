export interface Budget {
  id: number;
  userId: number;
  targetYear: number;
  targetMonth: number;
  title: string;
  totalAmount: number;
  remainingAmount: number;
  currency: string;
  color: string;
}
