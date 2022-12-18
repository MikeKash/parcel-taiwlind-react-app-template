import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/Test", {
          signal: controller.signal,
        });
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return <div>{message}</div>;
};

export default Admin;
