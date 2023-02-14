import { ITransactions } from "../interfaces/transaction.interface";
import { createApiClient } from "../utils/api";

export const TransactionService = {
  getAllTransactions: () =>
    createApiClient(true).get<ITransactions>("/user-wallet-transaction"),

getTransactionSummary: () => createApiClient(true).get(`/users/wallets/transactions/summaries`)
};
