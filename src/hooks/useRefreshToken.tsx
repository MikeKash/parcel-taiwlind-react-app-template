import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/Auth/refresh", {
      withCredentials: true,
    });
    if (auth) setAuth({ ...auth, accessToken: response.data.accessToken });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
