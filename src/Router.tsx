import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Missing from "./pages/Missing";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="restore-password" element={<ResetPassword />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
);

export default AppRouter;
