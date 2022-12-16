import { MouseEvent, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/Auth/logout");
      if (response.status === 200) {
        setAuth(undefined);
        navigate("/login");
      }
    } catch (err) {
      console.error("err logging out", err);
    }
  };

  return (
    <div>
      <button
        className="bg-red-900	text-white font-bold px-4 py-2"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Logout;
