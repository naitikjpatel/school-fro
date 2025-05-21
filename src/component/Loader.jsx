import React from "react";

import { RiseLoader } from "react-spinners";

const Loader = ({ loading, size = 40, color = "#000000" }) => {
  return (
    <div className=" bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <RiseLoader />
    </div>
  );
};

export default Loader;
