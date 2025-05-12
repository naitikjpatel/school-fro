import React from "react";
import { useState, useEffect } from "react";

import Loader from "../component/Loader";
import TypesDashboard from "../component/TypesDashboard";
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
        <TypesDashboard/>
      )}
    </>
  );
};
export default Home;