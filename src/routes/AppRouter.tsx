import DashboardLayout from "@/layout/DashboardLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import UserDetailsPage from "@/pages/dashboard/user/UserDetailsPage";
import UserPage from "@/pages/dashboard/user/UserPage";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";

import { Route, Routes } from "react-router-dom";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default AppRouter;
