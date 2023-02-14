import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";


export const AdminLayout = () => {
  return (
    <DashboardWrapper sidebar={sidebar}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};

const sidebar = [
  { name: "Dashboard", path: "/dashboard", iconName: "dashboard" },
  {
    name: "Send",
    path: "/send",
    iconName: "send",
  },
  {
    name: "Wallet",
    path: "/wallet",
    iconName: "send",
  },
  { name: "Beneficiary", path: "/beneficiary", iconName: "beneficiary" },
  { name: "Transaction", path: "/transactions", iconName: "transaction" },
];
