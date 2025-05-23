import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate
import Loader from "../component/Loader";
import LoginForm from "../component/LoginForm";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    if (!loading) {
      const role = localStorage.getItem("role");
      if (role === "Student") {
        navigate("/layoutstudent");
      } else if (role === "Teacher") {
        navigate("/layoutteacher");
      }
    }
  }, [loading, navigate]);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;