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
        userEmail: "tony@stark.com",
        password: "123456789",
      });
      const accessToken = response?.data?.token;
      const user = response?.data?.user;
      setAuth({ user, accessToken });
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
