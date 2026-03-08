import Header from "./components/Header";
import AllJobs from "./components/AllJobs";
import DashboardStats from "./components/DashboardStats";

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <DashboardStats />
      <AllJobs />
    </div>
  );
}
