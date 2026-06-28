import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
  
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <a href="/dashboard">Dashboard</a>
          <a href="/dashboard/users">Users</a>
          <a href="/dashboard/posts">Posts</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>

     
      <div className="flex-1 flex flex-col">
     
        <header className="h-14 bg-white shadow flex items-center px-4">
          <h1 className="font-semibold">Topbar</h1>
        </header>

     
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;