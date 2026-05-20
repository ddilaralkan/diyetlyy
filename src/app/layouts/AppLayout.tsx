import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // En dış kapsayıcıya modern font sınıfını ve pürüzsüzleştirme (antialiased) ekledik
    <div className="flex min-h-screen font-sans antialiased selection:bg-[#557A2B]/20">
      
      {/* ANA İÇERİK ALANI */}
      {/* Arka planı düz beyaz yerine o premium kırık beyaza (#F7F7F5) çektik */}
      <div className="flex-1 bg-[#F7F7F5]">
        
        <Header onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="p-6 sm:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </main>

      </div>

      {/* YAN MENÜ (SIDEBAR) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

    </div>
  );
}

export default AppLayout;