import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />}/>
      </Routes>
    </>
  );
}
export default AppRouter;
