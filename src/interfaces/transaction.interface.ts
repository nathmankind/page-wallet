export interface ITransactions {
  data: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
    wallet: {
      id: number;
      user_id: number;
      wallet_type_id: number;
      balance: string;
      balance_before: string;
      balance_after: string;
      ledger_balance: string;
      currency: string;
      created_at: string;
      updated_at: string;
    }[];
    transaction: [];
  };
}
