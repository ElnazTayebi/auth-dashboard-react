import { Outlet, Link, useNavigate } from "@tanstack/react-router";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const userImage = localStorage.getItem("userImage") || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");

    navigate({ to: "/login" });
  };

  return (
    <div className="flex h-screen">
    
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 tracking-wide text-blue-400">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="p-2 rounded hover:bg-gray-800 transition-colors [&.active]:bg-blue-600 [&.active]:font-semibold"
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              className="p-2 rounded hover:bg-gray-800 transition-colors [&.active]:bg-blue-600 [&.active]:font-semibold"
            >
              Users
            </Link>
            <Link
              to="/posts"
              className="p-2 rounded hover:bg-gray-800 transition-colors [&.active]:bg-blue-600 [&.active]:font-semibold"
            >
              Posts
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded hover:bg-gray-800 transition-colors [&.active]:bg-blue-600 [&.active]:font-semibold"
            >
              Settings
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-left p-2 rounded bg-red-900/40 text-red-400 hover:bg-red-600 hover:text-white transition-all text-sm font-medium"
        >
          🚪 Sign Out
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h1 className="font-semibold text-gray-700">Welcome back!</h1>

          <div className="flex items-center gap-3 border-l pl-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                {userName.charAt(0)}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
