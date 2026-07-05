import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const UserDetailsPage = lazy(() => import("@/pages/dashboard/user/UserDetailsPage"));
const UserPage = lazy(() => import("@/pages/dashboard/user/UserPage"));
const Login = lazy(() => import("@/pages/LoginPage"));
const Register = lazy(() => import("@/pages/RegisterPage"));

function AppRouter() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500 font-medium">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AppRouter;
