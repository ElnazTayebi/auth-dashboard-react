import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
