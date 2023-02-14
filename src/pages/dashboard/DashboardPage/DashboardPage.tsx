import { GraphWrapper } from "../../../components/Graph/GraphWrapper";
import BarGraph from "../../../components/Graph/Graphs/BarGraph";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { useQuery } from "react-query";
import { TransactionService } from "../../../services/transaction.service";
import dayjs from "dayjs";
import { currencyFormat } from "../../../utils/helpers";
import { Label } from "../../../components/Label/Label";
import { TextInput } from "../../../components/FormInputs/TextInput";
import { Button } from "../../../components/Button/Button";
import { SelectField } from "../../../components/FormInputs/SelectField";

const DashboardPage = () => {
  const navigate = useNavigate();

  const {
    data: transactionSummary,
    isLoading,
    refetch,
  } = useQuery(
    "query-agents",
    async () => {
      return TransactionService.getTransactionSummary();
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

  const mockData = [
    {
      id: "TRUD9393BJEKFN",
      created_at: new Date().toISOString(),
      amount: "40000",
      status: "success",
    },
    {
      id: "TRUD9393BJEKFN",
      created_at: new Date().toISOString(),
      amount: "40000",
      status: "success",
    },
    {
      id: "HYUD9393BJEKFN",
      created_at: new Date().toISOString(),
      amount: "40000",
      status: "success",
    },
    {
      id: "IUJK9393BJEKFN",
      created_at: new Date().toISOString(),
      amount: "40000",
      status: "success",
    },
    {
      id: "OOJD9393BJEKFN",
      created_at: new Date().toISOString(),
      amount: "40000",
      status: "success",
    },
  ];
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="card flex flex-col gap-6 bg-black p-4 text-white rounded-lg">
          <div className="flex justify-between gap-8">
            <div className="flex gap-2">
              <img src="/icons/ng-flag.svg" alt="NG" />
              <span className="my-auto">NGN</span>
            </div>

            <p className="my-auto text-[12px]">Available balance</p>
          </div>
          <div className="amount">
            <div className="font-bold text-lg">12,345 NGN </div>
            <p className="text-[12px] mt-0 leading-none">-N180.000 </p>
          </div>
        </div>

        <div className="card flex flex-col gap-6 p-4 shadow rounded-lg">
          <div className="flex justify-between gap-8">
            <div className="flex gap-2">
              <img src="/icons/ng-flag.svg" alt="NG" />
              <span className="my-auto">NGN</span>
            </div>

            <p className="my-auto text-[12px]">Available balance</p>
          </div>
          <div className="amount">
            <div className="font-bold text-lg">12,345 NGN </div>
            <p className="text-[12px] mt-0 leading-none">-N180.000 </p>
          </div>
        </div>
      </div>

      <div className="my-6">
        <GraphWrapper graphTitle="Statistics">
          <BarGraph
            data={{
              colors: ["#000000"],
              xAxisLabel: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              stacked: true,
              seriesData: [
                {
                  name: "series-1",
                  data: [
                    200, 400, 200, 400, 100, 300, 300, 300, 400, 200, 325, 310,
                  ],
                },
              ],
            }}
          />
        </GraphWrapper>
      </div>

      <div className="flex w-full gap-4">
        <div className="w-2/3">
          <Table
            data={mockData}
            filterType="agents"
            tableName="Transaction"
            columns={[
              { header: "ID", view: (row) => <div> {row.id} </div> },
              {
                header: "Date",
                view: (row) => (
                  <div>{dayjs(row.created_at).format("D MMMM, h:mm A")} </div>
                ),
              },
              {
                header: "Amount",
                view: (row) => <div> {currencyFormat(row.amount)} </div>,
              },

              {
                header: "Status",
                view: (row) => (
                  <div>
                    {" "}
                    <Label label={row.status} />{" "}
                  </div>
                ),
              },
            ]}
            loading={false}
            hideActionName
          />
        </div>
        <div className="w-1/3 bg-white rounded-lg shadow p-4 relative">
          <h5 className="font-bold mb-6 mt-2">Quick transaction</h5>
          <div className="flex w-full border border-gray-100 gap-3 rounded-lg">
            <div className="bg-[#F7F9FA] w-1/2 p-3 text-center rounded-lg">
              Add money
            </div>
            <div className=" w-1/2 p-3 text-center rounded-lg">
              Withdraw
            </div>
          </div>

          <div className="py-16">
            <div className="my-4 w-fit">
              <div className="flex bg-[#F7F9FA] gap-3 p-4 rounded">
                <img src="/icons/ng-flag.svg" alt="" />
               
                <select name="account" className="bg-transparent" id="">
                  <option value="1">Main</option>
                </select>
              </div>
            </div>

            <TextInput
              type="text"
              label="Amount"
              placeholder="Enter amount"
              context
            />
          </div>
          <div className="my-4 absolute bottom-0 mx-auto items-center w-[90%] right-0 left-0">
            <Button
              label="Add"
              className="py-6"
              fullWidth
              isLoading={false}
              type="submit"
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
