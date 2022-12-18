import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PrivateInfo from "../pages/PrivateInfo";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.accessToken) return <Outlet />;
  else return <Navigate to="/login" state={{ from: location }} replace />;

};

export default ProtectedRoute;
