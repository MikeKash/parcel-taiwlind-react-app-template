import axios from "../api/axios";

const RefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/api/Auth/refresh", {
      withCredentials: true,
    });

    return response.data.accessToken;
  };

  return (
    <div>
      <button
        className="bg-sky-900	text-white font-bold px-4 py-2"
        onClick={refresh}
      >
        Refresh Token
      </button>
    </div>
  );
};

export default RefreshToken;
