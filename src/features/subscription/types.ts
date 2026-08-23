export interface PaymentType {
  id: number;
  name: string;
}

export interface PaymentAccount {
  id: number;
  name: string;
  number: string;
  payment_type: PaymentType;
}

export interface Plan {
  id: number;
  name: string;
  amount: number;
  /** Duration of the plan in days */
  month: number;
}
