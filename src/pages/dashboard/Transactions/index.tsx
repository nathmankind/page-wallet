import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Table } from "../../../components/Table/Table";

import { useAuth } from "../../../zustand/auth.store";
import { TransactionService } from "../../../services/transaction.service";
import { Status } from "../../../components/Status/Status";
import { Label } from "../../../components/Label/Label";
import dayjs from "dayjs";

const AgentsPage = () => {
  const {
    data: allTransactions,
    isLoading,
    refetch,
  } = useQuery(
    "query-agents",
    async () => {
      return TransactionService.getAllTransactions();
    },
    {
      onSuccess: (res) => {
        console.log("RESPONSE Agents", res);
      },
      onError: (err: any) => {
        console.log("Error", err.response);
      },
    }
  );



  return (
    <div className="w-full">
      {allTransactions?.data.data.wallet.length!! < 1 ? (
        <div className="text-center py-40">
          <img src="/images/no-transaction.svg" className="mx-auto" alt="" />
          <h6 className="font-bold text-center mt-6">No transactions yet</h6>
          <p className="text-gray-500">
            After your first transaction you will be able to view it here
          </p>
        </div>
      ) : (
        <div className="">
          <Table
            data={allTransactions?.data.data.wallet}
            filterType="agents"
            tableName="Transaction"
            columns={[
              { header: "Reference", view: (row) => <div> {row.id}</div> },

              {
                header: "Transaction information",
                view: (row) => <div>{row.balance}</div>,
              },
              {
                header: "Currency",
                view: (row) => <div> {row.currency} </div>,
              },
              {
                header: "Date",
                view: (row) => (
                  <div>
                    {" "}
                    {dayjs(row.created_at).format("MMMM D, YYYY h:mm A")}{" "}
                  </div>
                ),
              },
              {
                header: "Status",
                view: (row) => <div>---</div>,
              },
            ]}
            loading={false}
            hideActionName
          />
        </div>
      )}
    </div>
  );
};

export default AgentsPage;
