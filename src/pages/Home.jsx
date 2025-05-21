import React from "react";
import { useState, useEffect } from "react";

import Loader from "../component/Loader";

import LoginForm from "../component/LoginForm";
const Home = () => {
    const [loading, setLoading] = useState(true);
    setTimeout
    (() => {
        setLoading(false);
    }, 1400);
  return ( 
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <LoginForm/>
      )}
    </>
  );
};
export default Home;