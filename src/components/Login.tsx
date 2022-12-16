import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const REGISTER_URL = "/api/Auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(REGISTER_URL, {
        userEmail: "string",
        password: "string",
      });
      const accessToken = response?.data?.token;
      const roles = [2001, 1984, 5150];
      const user = response?.data?.user;
      setAuth({ user, roles, accessToken });
      navigate(from || "/", { replace: true });
    } catch (err) {
      console.error("err logging in", err);
    }
  };

  return (
    <div>
      <button
        className="bg-sky-900	text-white font-bold px-4 py-2"
        onClick={handleLogin}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
