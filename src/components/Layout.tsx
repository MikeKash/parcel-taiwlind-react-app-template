import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Layout = () => {
  const { auth } = useContext(AuthContext);

  const isLoggedIn = !!auth?.accessToken;

  return (
    <div>
      <nav className="mb-4">
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/restore-password">Reset Password</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
          {/* <li>
            <Link to="/refresh-token">Refresh Token</Link>
          </li> */}
          {isLoggedIn ? (
            <>
              <li className="font-bold mt-2">To Protected routes</li>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/admin">See Admins TEST</Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default Layout;
