import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Missing from "./components/Missing";
import ProtectedRoute from "./components/ProtectedRoute";
import RefreshToken from "./components/RefreshToken";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import Home from "./pages/Home";

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
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="refresh-token" element={<RefreshToken />} />

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
