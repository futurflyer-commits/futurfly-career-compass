import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-[260px] transition-all duration-300">
        <TopHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Child Pages mount inside Outlet */}
        <main className="flex-1 overflow-x-hidden p-0 m-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
