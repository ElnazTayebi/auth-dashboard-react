import { Outlet, Link } from "@tanstack/react-router";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
  
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/settings">Settings</Link>
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