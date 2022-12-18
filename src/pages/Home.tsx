import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-6 items-center mt-4">
      <h1 className="text-3xl font-bold underline">
        {`Hello ${auth?.user.userName}.`}
      </h1>
      <p className="text-xl font-bold">Welcome to My new React Template App!</p>
    </div>
  );
};

export default Home;
