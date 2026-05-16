import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-gray-100">

        <Header />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AppLayout;