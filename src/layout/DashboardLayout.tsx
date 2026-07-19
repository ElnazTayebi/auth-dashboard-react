import { Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "#/components/ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

type UserData = {
  name: string;
  image: string;
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getUserData = (): UserData => {
    const rowUser = localStorage.getItem("user");
    if (rowUser) {
      try {
        const parsedUser = JSON.parse(rowUser);
        return {
          name: parsedUser.username || "User",
          image: parsedUser.image || "",
        };
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    return {
      name: localStorage.getItem("userName") || "User",
      image: localStorage.getItem("userImage") || "",
    };
  };

  const { name: userName, image: userImage } = getUserData();

  const handleLogout = () => {
    localStorage.clear();
    navigate({ to: "/login" });
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <TooltipProvider delayDuration={0}>
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
        <Sidebar handleLogout={handleLogout} />
        {isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
        <div className="flex-1 flex flex-col">
          <Header
            onOpenSidebar={() => setIsSidebarOpen(true)}
            userName={userName}
            userImage={userImage}
          />
          <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;
